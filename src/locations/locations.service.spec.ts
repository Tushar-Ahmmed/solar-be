import { ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  const division = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  };
  const district = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  };
  const upazila = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  };
  let service: LocationsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new LocationsService({
      division,
      district,
      upazila,
    } as unknown as PrismaService);
  });

  it('returns only active divisions for public reads', async () => {
    division.findMany.mockResolvedValue([
      { id: 'division-id', isActive: true },
    ]);

    await expect(service.findActiveDivisions()).resolves.toEqual([
      {
        id: 'division-id',
        name: undefined,
        nameBn: undefined,
        slug: undefined,
        code: undefined,
        isActive: true,
      },
    ]);
    expect(division.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isActive: true } }),
    );
  });

  it('rejects a district under an inactive division', async () => {
    division.findUnique.mockResolvedValue({ isActive: false });

    await expect(
      service.createDistrict({
        divisionId: 'division-id',
        name: 'Dhaka',
        slug: 'dhaka-district',
        code: 'DHK-01',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(district.create).not.toHaveBeenCalled();
  });

  it('does not return districts under an inactive division', async () => {
    district.findMany.mockResolvedValue([]);

    await service.findActiveDistricts('division-id');

    expect(district.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          divisionId: 'division-id',
          isActive: true,
          division: { isActive: true },
        },
      }),
    );
  });

  it('does not return upazilas under an inactive district or division', async () => {
    upazila.findMany.mockResolvedValue([]);

    await service.findActiveUpazilas('district-id');

    expect(upazila.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          districtId: 'district-id',
          isActive: true,
          district: {
            isActive: true,
            division: { isActive: true },
          },
        },
      }),
    );
  });

  it('blocks division deactivation while active districts exist', async () => {
    division.findUnique.mockResolvedValue({
      isActive: true,
      districts: [{ id: 'district-id' }],
    });

    await expect(
      service.deactivateDivision('division-id'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(division.update).not.toHaveBeenCalled();
  });
});
