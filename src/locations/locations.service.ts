import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDistrictDto,
  CreateDivisionDto,
  CreateUpazilaDto,
  ListLocationsDto,
  UpdateDistrictDto,
  UpdateDivisionDto,
  UpdateLocationStatusDto,
  UpdateUpazilaDto,
} from './dto/location.dto';

const fields = {
  id: true,
  name: true,
  bnName: true,
  slug: true,
  code: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};
const districtFields = { ...fields, divisionId: true };
const upazilaFields = { ...fields, districtId: true };
type Location = {
  id: string;
  name: string;
  bnName: string | null;
  slug: string;
  code: string;
  isActive: boolean;
  divisionId?: string;
  districtId?: string;
};
type LocationDelegate = {
  findMany(args: Record<string, unknown>): Promise<Location[]>;
  findUnique(args: Record<string, unknown>): Promise<Location | null>;
  create(args: Record<string, unknown>): Promise<Location>;
  update(args: Record<string, unknown>): Promise<Location>;
  count(args: Record<string, unknown>): Promise<number>;
};

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  findActiveDivisions() {
    return this.delegate('division')
      .findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
        select: fields,
      })
      .then((items) => items.map((item) => this.toResponse(item)));
  }
  findDivision(id: string) {
    return this.delegate('division')
      .findUnique({ where: { id }, select: fields })
      .then((value) =>
        value ? this.toResponse(value) : this.notFound('DIVISION_NOT_FOUND'),
      );
  }
  findActiveDistricts(divisionId: string) {
    return this.delegate('district')
      .findMany({
        where: {
          divisionId,
          isActive: true,
          division: { isActive: true },
        },
        orderBy: { name: 'asc' },
        select: districtFields,
      })
      .then((items) => items.map((item) => this.toResponse(item)));
  }
  findDistrict(id: string) {
    return this.delegate('district')
      .findUnique({ where: { id }, select: districtFields })
      .then((value) =>
        value ? this.toResponse(value) : this.notFound('DISTRICT_NOT_FOUND'),
      );
  }
  findActiveUpazilas(districtId: string) {
    return this.delegate('upazila')
      .findMany({
        where: {
          districtId,
          isActive: true,
          district: {
            isActive: true,
            division: { isActive: true },
          },
        },
        orderBy: { name: 'asc' },
        select: upazilaFields,
      })
      .then((items) => items.map((item) => this.toResponse(item)));
  }
  findUpazila(id: string) {
    return this.delegate('upazila')
      .findUnique({ where: { id }, select: upazilaFields })
      .then((value) =>
        value ? this.toResponse(value) : this.notFound('UPAZILA_NOT_FOUND'),
      );
  }

  createDivision(dto: CreateDivisionDto) {
    return this.create(
      'division',
      {
        ...this.locationData(dto),
        name: dto.name.trim(),
        slug: dto.slug.trim().toLowerCase(),
        code: dto.code.trim().toUpperCase(),
      },
      'DIVISION_ALREADY_EXISTS',
    );
  }
  createDistrict(dto: CreateDistrictDto) {
    return this.parent(
      dto.divisionId,
      'division',
      'PARENT_DIVISION_NOT_FOUND',
    ).then(() =>
      this.create(
        'district',
        {
          ...this.locationData(dto),
          name: dto.name.trim(),
          slug: dto.slug.trim().toLowerCase(),
          code: dto.code.trim().toUpperCase(),
          division: { connect: { id: dto.divisionId } },
        },
        'DISTRICT_ALREADY_EXISTS',
      ),
    );
  }
  createUpazila(dto: CreateUpazilaDto) {
    return this.parent(
      dto.districtId,
      'district',
      'PARENT_DISTRICT_NOT_FOUND',
    ).then(() =>
      this.create(
        'upazila',
        {
          ...this.locationData(dto),
          name: dto.name.trim(),
          slug: dto.slug.trim().toLowerCase(),
          code: dto.code.trim().toUpperCase(),
          district: { connect: { id: dto.districtId } },
        },
        'UPAZILA_ALREADY_EXISTS',
      ),
    );
  }

  updateDivision(id: string, dto: UpdateDivisionDto) {
    return this.update(
      'division',
      id,
      this.locationData(dto),
      'DIVISION_NOT_FOUND',
      'DIVISION_ALREADY_EXISTS',
    );
  }
  updateDistrict(id: string, dto: UpdateDistrictDto) {
    return this.updateChild(
      'district',
      id,
      dto.divisionId,
      this.locationData(dto),
      'DISTRICT_NOT_FOUND',
      'PARENT_DIVISION_NOT_FOUND',
      'DISTRICT_ALREADY_EXISTS',
      'division',
    );
  }
  updateUpazila(id: string, dto: UpdateUpazilaDto) {
    return this.updateChild(
      'upazila',
      id,
      dto.districtId,
      this.locationData(dto),
      'UPAZILA_NOT_FOUND',
      'PARENT_DISTRICT_NOT_FOUND',
      'UPAZILA_ALREADY_EXISTS',
      'district',
    );
  }

  deactivateDivision(id: string) {
    return this.deactivate('division', id, 'districts', 'DIVISION_NOT_FOUND');
  }
  deactivateDistrict(id: string) {
    return this.deactivate('district', id, 'upazilas', 'DISTRICT_NOT_FOUND');
  }
  deactivateUpazila(id: string) {
    return this.setStatus('upazila', id, false, 'UPAZILA_NOT_FOUND');
  }
  activateDivision(id: string, dto: UpdateLocationStatusDto) {
    return dto.isActive
      ? this.setStatus('division', id, true, 'DIVISION_NOT_FOUND')
      : this.deactivateDivision(id);
  }
  activateDistrict(id: string, dto: UpdateLocationStatusDto) {
    return dto.isActive
      ? this.statusChild('district', id, true, 'DISTRICT_NOT_FOUND', 'division')
      : this.deactivateDistrict(id);
  }
  activateUpazila(id: string, dto: UpdateLocationStatusDto) {
    return dto.isActive
      ? this.statusChild('upazila', id, true, 'UPAZILA_NOT_FOUND', 'district')
      : this.deactivateUpazila(id);
  }

  async list(kind: 'division' | 'district' | 'upazila', dto: ListLocationsDto) {
    const where: Prisma.DivisionWhereInput = {
      ...(dto.isActive === undefined ? {} : { isActive: dto.isActive }),
      ...(dto.search
        ? {
            OR: [
              { name: { contains: dto.search.trim(), mode: 'insensitive' } },
              { code: { contains: dto.search.trim(), mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(kind === 'district' && dto.divisionId
        ? { divisionId: dto.divisionId }
        : {}),
      ...(kind === 'upazila' && dto.districtId
        ? { districtId: dto.districtId }
        : {}),
    };
    const delegate = this.delegate(kind);
    const skip = (dto.page - 1) * dto.limit;
    const allowedSort = ['name', 'code', 'createdAt'].includes(dto.sortBy)
      ? dto.sortBy
      : 'name';
    const [items, total] = await Promise.all([
      delegate.findMany({
        where,
        skip,
        take: dto.limit,
        orderBy: { [allowedSort]: dto.sortOrder },
        select:
          kind === 'district'
            ? districtFields
            : kind === 'upazila'
              ? upazilaFields
              : fields,
      }),
      delegate.count({ where }),
    ]);
    return {
      items: items.map((item) => this.toResponse(item)),
      page: dto.page,
      limit: dto.limit,
      total,
      totalPages: Math.ceil(total / dto.limit),
    };
  }

  private locationData(dto: Partial<CreateDivisionDto & UpdateDivisionDto>) {
    return {
      ...(dto.nameBn !== undefined
        ? { bnName: dto.nameBn.trim() || null }
        : {}),
      ...(dto.slug !== undefined
        ? { slug: dto.slug.trim().toLowerCase() }
        : {}),
      ...(dto.code !== undefined
        ? { code: dto.code.trim().toUpperCase() }
        : {}),
      ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
    };
  }
  private delegate(
    kind: 'division' | 'district' | 'upazila',
  ): LocationDelegate {
    return this.prisma[kind] as unknown as LocationDelegate;
  }
  private async parent(
    id: string,
    kind: 'division' | 'district',
    errorCode: string,
  ) {
    const record = await this.delegate(kind).findUnique({
      where: { id },
      select: { isActive: true },
    });
    if (!record) this.notFound(errorCode);
    if (!record.isActive)
      this.business('PARENT_INACTIVE', 'Parent location is inactive');
  }
  private async create(
    kind: 'division' | 'district' | 'upazila',
    data: object,
    errorCode: string,
  ) {
    try {
      const item = await this.delegate(kind).create({
        data,
        select:
          kind === 'district'
            ? districtFields
            : kind === 'upazila'
              ? upazilaFields
              : fields,
      });
      return this.toResponse(item);
    } catch (error) {
      this.handleConflict(error, errorCode);
      throw error;
    }
  }
  private async update(
    kind: 'division' | 'district' | 'upazila',
    id: string,
    data: object,
    notFound: string,
    conflict: string,
  ) {
    try {
      const item = await this.delegate(kind).update({
        where: { id },
        data,
        select:
          kind === 'district'
            ? districtFields
            : kind === 'upazila'
              ? upazilaFields
              : fields,
      });
      return this.toResponse(item);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        this.notFound(notFound);
      this.handleConflict(error, conflict);
      throw error;
    }
  }
  private async updateChild(
    kind: 'district' | 'upazila',
    id: string,
    parentId: string | undefined,
    data: object,
    notFound: string,
    parentError: string,
    conflict: string,
    parent: 'division' | 'district',
  ) {
    if (parentId) await this.parent(parentId, parent, parentError);
    return this.update(
      kind,
      id,
      {
        ...data,
        ...(parentId ? { [parent]: { connect: { id: parentId } } } : {}),
      },
      notFound,
      conflict,
    );
  }
  private async deactivate(
    kind: 'division' | 'district',
    id: string,
    children: 'districts' | 'upazilas',
    notFound: string,
  ) {
    const record = await this.delegate(kind).findUnique({
      where: { id },
      select: {
        isActive: true,
        [children]: {
          where: { isActive: true },
          select: { id: true },
          take: 1,
        },
      },
    });
    if (!record) this.notFound(notFound);
    if ((record as Location & Record<string, Location[]>)[children].length)
      this.business(
        'LOCATION_HAS_ACTIVE_CHILDREN',
        'Location has active children',
      );
    return this.setStatus(kind, id, false, notFound);
  }
  private async statusChild(
    kind: 'district' | 'upazila',
    id: string,
    active: boolean,
    notFound: string,
    parent: 'division' | 'district',
  ) {
    if (active) {
      const current = await this.delegate(kind).findUnique({
        where: { id },
        select: { [parent]: { select: { isActive: true } } },
      });
      if (!current) this.notFound(notFound);
      if (!(current as Location & Record<string, Location>)[parent].isActive)
        this.business('PARENT_INACTIVE', 'Parent location is inactive');
    }
    return this.setStatus(kind, id, active, notFound);
  }
  private async setStatus(
    kind: 'division' | 'district' | 'upazila',
    id: string,
    isActive: boolean,
    notFound: string,
  ) {
    try {
      const item = await this.delegate(kind).update({
        where: { id },
        data: { isActive },
        select:
          kind === 'district'
            ? districtFields
            : kind === 'upazila'
              ? upazilaFields
              : fields,
      });
      return this.toResponse(item);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        this.notFound(notFound);
      throw error;
    }
  }
  private handleConflict(error: unknown, code: string): void {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    )
      this.business(code, 'Location already exists');
  }
  private business(errorCode: string, message: string): never {
    throw new ConflictException({ message, errorCode });
  }
  private notFound(errorCode: string): never {
    throw new NotFoundException({ message: 'Location not found', errorCode });
  }
  private toResponse(item: Location) {
    return {
      id: item.id,
      name: item.name,
      nameBn: item.bnName,
      slug: item.slug,
      code: item.code,
      isActive: item.isActive,
      ...(item.divisionId ? { divisionId: item.divisionId } : {}),
      ...(item.districtId ? { districtId: item.districtId } : {}),
    };
  }
}
