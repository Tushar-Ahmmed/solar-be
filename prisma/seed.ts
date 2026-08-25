import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const PASSWORD_HASH = bcrypt.hashSync('Password123!', 10);

const permissionDefinitions = [
  'users.read',
  'users.create',
  'users.update',
  'users.delete',
  'products.read',
  'products.create',
  'products.update',
  'products.delete',
  'orders.read',
  'orders.create',
  'orders.update',
  'inventory.read',
  'inventory.create',
  'inventory.update',
  'quotes.read',
  'quotes.create',
  'quotes.update',
  'services.read',
  'services.create',
  'services.update',
  'projects.read',
  'projects.create',
  'projects.update',
  'warranty.read',
  'warranty.create',
  'warranty.update',
  'reports.read',
  'settings.read',
  'settings.update',
];

const roleDefinitions = [
  { name: 'SUPER_ADMIN', description: 'Full platform access' },
  { name: 'ADMIN', description: 'Business administration access' },
  { name: 'STAFF', description: 'Sales and operations staff' },
  { name: 'CUSTOMER', description: 'Customer account access' },
];

const divisionDefinitions = [
  { name: 'Dhaka', bnName: 'ঢাকা', code: 'DHK' },
  { name: 'Chattogram', bnName: 'চট্টগ্রাম', code: 'CTG' },
  { name: 'Rajshahi', bnName: 'রাজশাহী', code: 'RAJ' },
  { name: 'Khulna', bnName: 'খুলনা', code: 'KHU' },
  { name: 'Barishal', bnName: 'বরিশাল', code: 'BAR' },
  { name: 'Sylhet', bnName: 'সিলেট', code: 'SYL' },
  { name: 'Rangpur', bnName: 'রংপুর', code: 'RNG' },
  { name: 'Mymensingh', bnName: 'ময়মনসিংহ', code: 'MYM' },
];

const districtDefinitions = [
  { division: 'Dhaka', name: 'Dhaka', bnName: 'ঢাকা', code: 'DHK-01' },
  { division: 'Dhaka', name: 'Gazipur', bnName: 'গাজীপুর', code: 'DHK-02' },
  {
    division: 'Chattogram',
    name: 'Chattogram',
    bnName: 'চট্টগ্রাম',
    code: 'CTG-01',
  },
  {
    division: 'Chattogram',
    name: 'Coxs Bazar',
    bnName: 'কক্সবাজার',
    code: 'CTG-02',
  },
  { division: 'Rajshahi', name: 'Rajshahi', bnName: 'রাজশাহী', code: 'RAJ-01' },
  { division: 'Khulna', name: 'Khulna', bnName: 'খুলনা', code: 'KHU-01' },
  { division: 'Barishal', name: 'Barishal', bnName: 'বরিশাল', code: 'BAR-01' },
  { division: 'Sylhet', name: 'Sylhet', bnName: 'সিলেট', code: 'SYL-01' },
  { division: 'Rangpur', name: 'Rangpur', bnName: 'রংপুর', code: 'RNG-01' },
  {
    division: 'Mymensingh',
    name: 'Mymensingh',
    bnName: 'ময়মনসিংহ',
    code: 'MYM-01',
  },
];

const upazilaDefinitions = [
  { district: 'Dhaka', name: 'Dhanmondi', bnName: 'ধানমন্ডি', code: 'DHK-DHN' },
  { district: 'Dhaka', name: 'Mirpur', bnName: 'মিরপুর', code: 'DHK-MIR' },
  {
    district: 'Gazipur',
    name: 'Gazipur Sadar',
    bnName: 'গাজীপুর সদর',
    code: 'GAZ-SAD',
  },
  {
    district: 'Chattogram',
    name: 'Pahartali',
    bnName: 'পাহাড়তলী',
    code: 'CTG-PAH',
  },
  {
    district: 'Coxs Bazar',
    name: 'Coxs Bazar Sadar',
    bnName: 'কক্সবাজার সদর',
    code: 'CXB-SAD',
  },
  { district: 'Rajshahi', name: 'Boalia', bnName: 'বোয়ালিয়া', code: 'RAJ-BOA' },
  {
    district: 'Khulna',
    name: 'Khulna Sadar',
    bnName: 'খুলনা সদর',
    code: 'KHU-SAD',
  },
  {
    district: 'Barishal',
    name: 'Barishal Sadar',
    bnName: 'বরিশাল সদর',
    code: 'BAR-SAD',
  },
  {
    district: 'Sylhet',
    name: 'Sylhet Sadar',
    bnName: 'সিলেট সদর',
    code: 'SYL-SAD',
  },
  {
    district: 'Rangpur',
    name: 'Rangpur Sadar',
    bnName: 'রংপুর সদর',
    code: 'RNG-SAD',
  },
  {
    district: 'Mymensingh',
    name: 'Mymensingh Sadar',
    bnName: 'ময়মনসিংহ সদর',
    code: 'MYM-SAD',
  },
];

const categoryDefinitions = [
  {
    name: 'Solar Panels',
    slug: 'solar-panels',
    description: 'Photovoltaic panels',
    status: 'ACTIVE',
  },
  {
    name: 'Monocrystalline Panels',
    slug: 'monocrystalline-panels',
    parent: 'Solar Panels',
    description: 'Premium mono panel series',
    status: 'ACTIVE',
  },
  {
    name: 'Solar Inverters',
    slug: 'solar-inverters',
    description: 'Inverter systems',
    status: 'ACTIVE',
  },
  {
    name: 'Batteries',
    slug: 'solar-batteries',
    description: 'Energy storage solutions',
    status: 'ACTIVE',
  },
  {
    name: 'Charge Controllers',
    slug: 'charge-controllers',
    description: 'Charge control devices',
    status: 'ACTIVE',
  },
  {
    name: 'Solar Lights',
    slug: 'solar-lights',
    description: 'Outdoor and street lighting',
    status: 'ACTIVE',
  },
  {
    name: 'Cables',
    slug: 'solar-cables',
    description: 'DC and AC cables',
    status: 'ACTIVE',
  },
  {
    name: 'MC4 Connectors',
    slug: 'mc4-connectors',
    description: 'Connector accessories',
    status: 'ACTIVE',
  },
  {
    name: 'Mounting Structures',
    slug: 'mounting-structures',
    description: 'Racking and mounts',
    status: 'ACTIVE',
  },
  {
    name: 'Protection Devices',
    slug: 'protection-devices',
    description: 'Safety and protection hardware',
    status: 'ACTIVE',
  },
  {
    name: 'Solar Pumps',
    slug: 'solar-pumps',
    description: 'Water pumping systems',
    status: 'ACTIVE',
  },
  {
    name: 'Solar Accessories',
    slug: 'solar-accessories',
    description: 'General solar accessories',
    status: 'ACTIVE',
  },
];

const brandDefinitions = [
  {
    name: 'SunPeak',
    slug: 'sunpeak',
    description: 'Premium Bangladesh-focused solar solutions',
  },
  {
    name: 'SolarMax',
    slug: 'solarmax',
    description: 'Efficient and robust PV equipment',
  },
  {
    name: 'GreenVolt',
    slug: 'greenvolt',
    description: 'High-performance renewable energy systems',
  },
  {
    name: 'PowerRay',
    slug: 'powerray',
    description: 'Dependable power conversion and storage',
  },
  {
    name: 'EcoCharge',
    slug: 'ecocharge',
    description: 'Sustainable charging and energy systems',
  },
];

const productDefinitions = [
  {
    name: '550W Mono Solar Panel',
    category: 'Monocrystalline Panels',
    brand: 'SunPeak',
    sku: 'SP-550-MONO',
    price: '4500.00',
    salePrice: '4200.00',
    minimumOrderQuantity: 10,
    warrantyPeriod: 25,
    status: 'ACTIVE',
    featured: true,
  },
  {
    name: '450W Mono Solar Panel',
    category: 'Monocrystalline Panels',
    brand: 'GreenVolt',
    sku: 'GV-450-MONO',
    price: '3900.00',
    salePrice: '3600.00',
    minimumOrderQuantity: 10,
    warrantyPeriod: 25,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '5kW Hybrid Inverter',
    category: 'Solar Inverters',
    brand: 'SolarMax',
    sku: 'SM-5K-HYB',
    price: '210000.00',
    salePrice: '196000.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 60,
    status: 'ACTIVE',
    featured: true,
  },
  {
    name: '10kW On-grid Inverter',
    category: 'Solar Inverters',
    brand: 'PowerRay',
    sku: 'PR-10K-ON',
    price: '390000.00',
    salePrice: '365000.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 60,
    status: 'ACTIVE',
    featured: true,
  },
  {
    name: '200Ah Solar Battery',
    category: 'Batteries',
    brand: 'EcoCharge',
    sku: 'EC-200AH',
    price: '98000.00',
    salePrice: '91000.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 36,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '100Ah Solar Battery',
    category: 'Batteries',
    brand: 'SunPeak',
    sku: 'SP-100AH',
    price: '56000.00',
    salePrice: '52000.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 36,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '60A MPPT Charge Controller',
    category: 'Charge Controllers',
    brand: 'SolarMax',
    sku: 'SM-60A-MPPT',
    price: '32000.00',
    salePrice: '29500.00',
    minimumOrderQuantity: 2,
    warrantyPeriod: 24,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '40A MPPT Charge Controller',
    category: 'Charge Controllers',
    brand: 'GreenVolt',
    sku: 'GV-40A-MPPT',
    price: '24000.00',
    salePrice: '22500.00',
    minimumOrderQuantity: 2,
    warrantyPeriod: 24,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'Solar Street Light',
    category: 'Solar Lights',
    brand: 'EcoCharge',
    sku: 'EC-STREET-30W',
    price: '18000.00',
    salePrice: '16500.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 18,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '30W Solar Flood Light',
    category: 'Solar Lights',
    brand: 'SunPeak',
    sku: 'SP-FLOOD-30W',
    price: '14000.00',
    salePrice: '12800.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 18,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '4mm Solar Cable',
    category: 'Cables',
    brand: 'PowerRay',
    sku: 'PR-CABLE-4MM',
    price: '120.00',
    salePrice: '110.00',
    minimumOrderQuantity: 50,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: '6mm Solar Cable',
    category: 'Cables',
    brand: 'EcoCharge',
    sku: 'EC-CABLE-6MM',
    price: '170.00',
    salePrice: '155.00',
    minimumOrderQuantity: 50,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'MC4 Connector Pair',
    category: 'MC4 Connectors',
    brand: 'SolarMax',
    sku: 'SM-MC4-PAIR',
    price: '380.00',
    salePrice: '340.00',
    minimumOrderQuantity: 20,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'DC Fuse 32A',
    category: 'Protection Devices',
    brand: 'GreenVolt',
    sku: 'GV-FUSE-32A',
    price: '550.00',
    salePrice: '500.00',
    minimumOrderQuantity: 10,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'DC SPD',
    category: 'Protection Devices',
    brand: 'PowerRay',
    sku: 'PR-DC-SPD',
    price: '2200.00',
    salePrice: '2100.00',
    minimumOrderQuantity: 2,
    warrantyPeriod: 24,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'Mounting Rail 2m',
    category: 'Mounting Structures',
    brand: 'EcoCharge',
    sku: 'EC-RAIL-2M',
    price: '1500.00',
    salePrice: '1400.00',
    minimumOrderQuantity: 20,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'Solar Water Pump 1HP',
    category: 'Solar Pumps',
    brand: 'SunPeak',
    sku: 'SP-PUMP-1HP',
    price: '68250.00',
    salePrice: '63900.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 36,
    status: 'ACTIVE',
    featured: true,
  },
  {
    name: '12V DC Breaker',
    category: 'Protection Devices',
    brand: 'SolarMax',
    sku: 'SM-BREAKER-12V',
    price: '900.00',
    salePrice: '850.00',
    minimumOrderQuantity: 10,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'Solar Accessory Kit',
    category: 'Solar Accessories',
    brand: 'EcoCharge',
    sku: 'EC-ACCESS-KIT',
    price: '6800.00',
    salePrice: '6200.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
  {
    name: 'Battery Cable Set',
    category: 'Solar Accessories',
    brand: 'GreenVolt',
    sku: 'GV-BATT-CABLE',
    price: '2300.00',
    salePrice: '2100.00',
    minimumOrderQuantity: 1,
    warrantyPeriod: 12,
    status: 'ACTIVE',
    featured: false,
  },
];

const packageDefinitions = [
  {
    name: '3kW Home Solar Package',
    slug: '3kw-home-solar-package',
    description: 'Ideal for a standard urban home in Bangladesh',
    systemCapacityKw: '3.00',
    price: '420000.00',
    salePrice: '395000.00',
    installationIncluded: true,
    status: 'ACTIVE',
    featured: true,
    items: [
      { sku: 'SP-550-MONO', quantity: 6 },
      { sku: 'SM-5K-HYB', quantity: 1 },
      { sku: 'EC-200AH', quantity: 1 },
      { sku: 'SM-60A-MPPT', quantity: 1 },
    ],
  },
  {
    name: '5kW Home Solar Package',
    slug: '5kw-home-solar-package',
    description: 'Balanced solution for larger family homes',
    systemCapacityKw: '5.00',
    price: '650000.00',
    salePrice: '610000.00',
    installationIncluded: true,
    status: 'ACTIVE',
    featured: true,
    items: [
      { sku: 'SP-550-MONO', quantity: 10 },
      { sku: 'SM-5K-HYB', quantity: 1 },
      { sku: 'SP-100AH', quantity: 2 },
      { sku: 'GV-40A-MPPT', quantity: 1 },
    ],
  },
  {
    name: '10kW Commercial Solar Package',
    slug: '10kw-commercial-solar-package',
    description: 'Commercial setup for office and small factory loads',
    systemCapacityKw: '10.00',
    price: '1280000.00',
    salePrice: '1200000.00',
    installationIncluded: true,
    status: 'ACTIVE',
    featured: true,
    items: [
      { sku: 'GV-450-MONO', quantity: 18 },
      { sku: 'PR-10K-ON', quantity: 1 },
      { sku: 'EC-200AH', quantity: 3 },
      { sku: 'SM-60A-MPPT', quantity: 2 },
    ],
  },
];

const customerScenarios = [
  {
    name: 'Rahim Hasan',
    email: 'rahim.hasan@solar.local',
    phone: '01710000001',
    companyName: 'Rahim Home Energy',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    addressLine: 'House 12, Road 4, Dhanmondi',
    customerType: 'INDIVIDUAL',
  },
  {
    name: 'Shahrukh Ahmed',
    email: 'shahrukh.ahmed@solar.local',
    phone: '01710000002',
    companyName: 'Shahrukh Green Works',
    division: 'Chattogram',
    district: 'Chattogram',
    upazila: 'Pahartali',
    addressLine: 'House 23, Road 7, Pahartali',
    customerType: 'BUSINESS',
  },
  {
    name: 'Fatima Khatun',
    email: 'fatima.khatun@solar.local',
    phone: '01710000003',
    companyName: 'Fatima Residence',
    division: 'Khulna',
    district: 'Khulna',
    upazila: 'Khulna Sadar',
    addressLine: 'Flat 3B, Sonadanga',
    customerType: 'INDIVIDUAL',
  },
  {
    name: 'Niaz Islam',
    email: 'niaz.islam@solar.local',
    phone: '01710000004',
    companyName: 'Niaz Engineering',
    division: 'Sylhet',
    district: 'Sylhet',
    upazila: 'Sylhet Sadar',
    addressLine: 'Plot 18, Zindabazar',
    customerType: 'COMMERCIAL',
  },
  {
    name: 'Tapos Roy',
    email: 'tapos.roy@solar.local',
    phone: '01710000005',
    companyName: 'Tapos Agro Ventures',
    division: 'Rajshahi',
    district: 'Rajshahi',
    upazila: 'Boalia',
    addressLine: 'Village Kharkharia, Boalia',
    customerType: 'COMMERCIAL',
  },
  {
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@solar.local',
    phone: '01710000006',
    companyName: 'Nusrat Boutique',
    division: 'Barishal',
    district: 'Barishal',
    upazila: 'Barishal Sadar',
    addressLine: 'Lane 5, Gausul Azam Road',
    customerType: 'BUSINESS',
  },
  {
    name: 'Arafat Hossain',
    email: 'arafat.hossain@solar.local',
    phone: '01710000007',
    companyName: 'Arafat Solar Setup',
    division: 'Rangpur',
    district: 'Rangpur',
    upazila: 'Rangpur Sadar',
    addressLine: 'House 8, Rangpur Sadar',
    customerType: 'INDIVIDUAL',
  },
  {
    name: 'Salma Begum',
    email: 'salma.begum@solar.local',
    phone: '01710000008',
    companyName: 'Salma Care Home',
    division: 'Mymensingh',
    district: 'Mymensingh',
    upazila: 'Mymensingh Sadar',
    addressLine: 'House 17, Mymensingh Sadar',
    customerType: 'INDIVIDUAL',
  },
  {
    name: 'Mahmudul Alam',
    email: 'mahmudul.alam@solar.local',
    phone: '01710000009',
    companyName: 'Mahmudul Manufacturing',
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    addressLine: 'Factory 2, Gazipur Sadar',
    customerType: 'INDUSTRIAL',
  },
  {
    name: 'Kamal Uddin',
    email: 'kamal.uddin@solar.local',
    phone: '01710000010',
    companyName: 'Kamal Retail Hub',
    division: 'Chattogram',
    district: 'Coxs Bazar',
    upazila: 'Coxs Bazar Sadar',
    addressLine: 'Shop 5, Hotel Street, Coxs Bazar',
    customerType: 'BUSINESS',
  },
];

function money(value: string) {
  return new Prisma.Decimal(value);
}

function makeOrderNumber(index: number) {
  return `ORD-2026-${String(index).padStart(6, '0')}`;
}

function makeLeadNumber(index: number) {
  return `LEAD-2026-${String(index).padStart(6, '0')}`;
}

function makeQuoteNumber(index: number) {
  return `QUO-2026-${String(index).padStart(6, '0')}`;
}

function makeRequestNumber(index: number) {
  return `SR-2026-${String(index).padStart(6, '0')}`;
}

function makeInstallationNumber(index: number) {
  return `INS-2026-${String(index).padStart(6, '0')}`;
}

function makeWarrantyNumber(index: number) {
  return `WAR-2026-${String(index).padStart(6, '0')}`;
}

async function seedLocations() {
  const divisionMap = new Map<string, string>();

  for (const division of divisionDefinitions) {
    const record = await prisma.division.upsert({
      where: { code: division.code },
      update: { bnName: division.bnName },
      create: {
        name: division.name,
        bnName: division.bnName,
        code: division.code,
      },
    });
    divisionMap.set(division.name, record.id);
  }

  const districtMap = new Map<string, string>();
  for (const district of districtDefinitions) {
    const divisionId = divisionMap.get(district.division);
    const record = await prisma.district.upsert({
      where: {
        divisionId_code: {
          divisionId: divisionId ?? '',
          code: district.code,
        },
      },
      update: { bnName: district.bnName },
      create: {
        divisionId: divisionId ?? '',
        name: district.name,
        bnName: district.bnName,
        code: district.code,
      },
    });
    districtMap.set(`${district.division}:${district.name}`, record.id);
  }

  const upazilaMap = new Map<string, string>();
  for (const upazila of upazilaDefinitions) {
    const districtId = districtMap.get(
      `${getDivisionForDistrict(upazila.district)}:${upazila.district}`,
    );
    const record = await prisma.upazila.upsert({
      where: {
        districtId_code: {
          districtId: districtId ?? '',
          code: upazila.code,
        },
      },
      update: { bnName: upazila.bnName },
      create: {
        districtId: districtId ?? '',
        name: upazila.name,
        bnName: upazila.bnName,
        code: upazila.code,
      },
    });
    upazilaMap.set(`${upazila.district}:${upazila.name}`, record.id);
  }

  return { divisionMap, districtMap, upazilaMap };
}

function getDivisionForDistrict(districtName: string) {
  const mapping: Record<string, string> = {
    Dhaka: 'Dhaka',
    Gazipur: 'Dhaka',
    Chattogram: 'Chattogram',
    'Coxs Bazar': 'Chattogram',
    Rajshahi: 'Rajshahi',
    Khulna: 'Khulna',
    Barishal: 'Barishal',
    Sylhet: 'Sylhet',
    Rangpur: 'Rangpur',
    Mymensingh: 'Mymensingh',
  };

  return mapping[districtName] ?? 'Dhaka';
}

async function seedRolesAndPermissions() {
  const roleMap = new Map<string, string>();

  for (const role of roleDefinitions) {
    const record = await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description },
      create: { name: role.name, description: role.description },
    });
    roleMap.set(role.name, record.id);
  }

  const permissionMap = new Map<string, string>();
  for (const permission of permissionDefinitions) {
    const record = await prisma.permission.upsert({
      where: { name: permission },
      update: {},
      create: {
        name: permission,
        resource: permission.split('.')[0],
        action: permission.split('.')[1],
        description: `${permission} access`,
      },
    });
    permissionMap.set(permission, record.id);
  }

  const rolePermissionMatrix: Record<string, string[]> = {
    SUPER_ADMIN: permissionDefinitions,
    ADMIN: permissionDefinitions.filter(
      (item) => !['users.delete', 'settings.update'].includes(item),
    ),
    STAFF: [
      'products.read',
      'orders.read',
      'orders.create',
      'inventory.read',
      'inventory.update',
      'quotes.read',
      'quotes.create',
      'quotes.update',
      'services.read',
      'services.create',
      'services.update',
      'projects.read',
      'projects.create',
      'projects.update',
      'warranty.read',
      'reports.read',
    ],
    CUSTOMER: [
      'products.read',
      'orders.read',
      'quotes.read',
      'services.read',
      'warranty.read',
    ],
  };

  for (const [roleName, permissions] of Object.entries(rolePermissionMatrix)) {
    const roleId = roleMap.get(roleName);
    if (!roleId) continue;

    for (const permission of permissions) {
      const permissionId = permissionMap.get(permission);
      if (!permissionId) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId,
            permissionId,
          },
        },
        update: {},
        create: {
          roleId,
          permissionId,
        },
      });
    }
  }

  return { roleMap, permissionMap };
}

async function seedUsers(roleMap: Map<string, string>) {
  const userSeed = [
    {
      email: 'superadmin@solar.local',
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
    },
    {
      email: 'admin@solar.local',
      firstName: 'System',
      lastName: 'Admin',
      role: 'ADMIN',
    },
    {
      email: 'staff.sales@solar.local',
      firstName: 'Sales',
      lastName: 'Staff',
      role: 'STAFF',
    },
    {
      email: 'staff.ops@solar.local',
      firstName: 'Operations',
      lastName: 'Staff',
      role: 'STAFF',
    },
    ...customerScenarios.map((scenario) => ({
      email: scenario.email,
      firstName: scenario.name.split(' ')[0],
      lastName: scenario.name.split(' ').slice(1).join(' ') || 'Customer',
      role: 'CUSTOMER',
    })),
  ];

  const createdUsers = new Map<string, string>();

  for (const user of userSeed) {
    const record = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        status: 'ACTIVE',
      },
      create: {
        email: user.email,
        phone: user.email.includes('superadmin') ? '+8801700000000' : undefined,
        passwordHash: PASSWORD_HASH,
        firstName: user.firstName,
        lastName: user.lastName,
        status: 'ACTIVE',
      },
    });

    const roleId = roleMap.get(user.role);
    if (roleId) {
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: record.id,
            roleId,
          },
        },
        update: {},
        create: {
          userId: record.id,
          roleId,
        },
      });
    }

    createdUsers.set(user.email, record.id);
  }

  return createdUsers;
}

async function seedCategoriesAndBrands() {
  const categoryMap = new Map<string, string>();
  for (const category of categoryDefinitions) {
    const parentId = category.parent
      ? (categoryMap.get(category.parent) ?? null)
      : null;
    const record = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        parentId,
        status: category.status as 'ACTIVE' | 'INACTIVE',
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId,
        status: category.status as 'ACTIVE' | 'INACTIVE',
      },
    });
    categoryMap.set(category.name, record.id);
  }

  const brandMap = new Map<string, string>();
  for (const brand of brandDefinitions) {
    const record = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        description: brand.description,
      },
      create: {
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
      },
    });
    brandMap.set(brand.name, record.id);
  }

  return { categoryMap, brandMap };
}

async function seedProducts(
  categoryMap: Map<string, string>,
  brandMap: Map<string, string>,
) {
  const productMap = new Map<string, string>();

  for (const product of productDefinitions) {
    const categoryId = categoryMap.get(product.category);
    const brandId = brandMap.get(product.brand);

    if (!categoryId || !brandId) continue;

    const record = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        slug: product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        categoryId,
        brandId,
        shortDescription: product.name,
        price: money(product.price),
        salePrice: money(product.salePrice ?? product.price),
        minimumOrderQuantity: product.minimumOrderQuantity,
        warrantyPeriod: product.warrantyPeriod,
        status: product.status as
          'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'OUT_OF_STOCK',
        featured: product.featured,
      },
      create: {
        name: product.name,
        slug: product.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        sku: product.sku,
        categoryId,
        brandId,
        shortDescription: product.name,
        description: `${product.name} for solar power systems in Bangladesh.`,
        price: money(product.price),
        salePrice: money(product.salePrice ?? product.price),
        minimumOrderQuantity: product.minimumOrderQuantity,
        warrantyPeriod: product.warrantyPeriod,
        status: product.status as
          'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'OUT_OF_STOCK',
        featured: product.featured,
      },
    });

    productMap.set(product.sku, record.id);

    await prisma.productImage.createMany({
      data: [
        {
          productId: record.id,
          objectKey: `products/${record.slug}.jpg`,
          url: `https://images.example.com/${record.slug}.jpg`,
          altText: record.name,
          sortOrder: 0,
          isPrimary: true,
        },
      ],
    });

    await prisma.productSpecification.createMany({
      data: [
        {
          productId: record.id,
          name: 'Warranty',
          value: `${product.warrantyPeriod ?? 24} months`,
          unit: 'months',
          sortOrder: 1,
        },
        {
          productId: record.id,
          name: 'MOQ',
          value: `${product.minimumOrderQuantity}`,
          unit: 'units',
          sortOrder: 2,
        },
      ],
    });

    const initialQuantity = product.sku.includes('PANEL')
      ? 100
      : product.sku.includes('BATTERY')
        ? 30
        : 50;
    await prisma.inventory.upsert({
      where: { productId: record.id },
      update: {
        quantity: initialQuantity,
        reorderLevel: initialQuantity > 20 ? 10 : 5,
      },
      create: {
        productId: record.id,
        quantity: initialQuantity,
        reservedQuantity: 0,
        reorderLevel: initialQuantity > 20 ? 10 : 5,
      },
    });

    await prisma.inventoryTransaction.create({
      data: {
        productId: record.id,
        type: 'STOCK_IN',
        quantity: initialQuantity,
        referenceType: 'INITIAL_SEED',
        referenceId: `seed-${record.sku}`,
        reason: 'Initial seed stock',
      },
    });
  }

  return productMap;
}

async function seedPackages(productMap: Map<string, string>) {
  for (const pkg of packageDefinitions) {
    const packageRecord = await prisma.solarPackage.upsert({
      where: { slug: pkg.slug },
      update: {
        name: pkg.name,
        description: pkg.description,
        systemCapacityKw: money(pkg.systemCapacityKw),
        price: money(pkg.price),
        salePrice: money(pkg.salePrice),
        installationIncluded: pkg.installationIncluded,
        featured: pkg.featured,
        status: pkg.status as 'ACTIVE' | 'INACTIVE',
      },
      create: {
        name: pkg.name,
        slug: pkg.slug,
        description: pkg.description,
        systemCapacityKw: money(pkg.systemCapacityKw),
        price: money(pkg.price),
        salePrice: money(pkg.salePrice),
        installationIncluded: pkg.installationIncluded,
        status: pkg.status as 'ACTIVE' | 'INACTIVE',
        featured: pkg.featured,
      },
    });

    for (const [index, productRef] of pkg.items.entries()) {
      const productId = productMap.get(productRef.sku);
      if (!productId) continue;

      await prisma.solarPackageItem.upsert({
        where: {
          id: `${packageRecord.id}:${productId}`,
        },
        update: {
          quantity: productRef.quantity,
          sortOrder: index,
        },
        create: {
          id: `${packageRecord.id}:${productId}`,
          packageId: packageRecord.id,
          productId,
          quantity: productRef.quantity,
          sortOrder: index,
        },
      });
    }
  }
}

async function seedCustomerScenarios() {
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@solar.local' },
  });
  const locations = await seedLocations();

  for (const [index, scenario] of customerScenarios.entries()) {
    const user = await prisma.user.upsert({
      where: { email: scenario.email },
      update: {
        phone: scenario.phone,
        firstName: scenario.name.split(' ')[0],
        lastName: scenario.name.split(' ').slice(1).join(' ') || 'Customer',
      },
      create: {
        email: scenario.email,
        phone: scenario.phone,
        passwordHash: PASSWORD_HASH,
        firstName: scenario.name.split(' ')[0],
        lastName: scenario.name.split(' ').slice(1).join(' ') || 'Customer',
        status: 'ACTIVE',
      },
    });

    await prisma.customerProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: scenario.companyName,
        customerType: scenario.customerType as
          'INDIVIDUAL' | 'BUSINESS' | 'COMMERCIAL' | 'INDUSTRIAL',
      },
      create: {
        userId: user.id,
        companyName: scenario.companyName,
        customerType: scenario.customerType as
          'INDIVIDUAL' | 'BUSINESS' | 'COMMERCIAL' | 'INDUSTRIAL',
      },
    });

    const profile = await prisma.customerProfile.findUnique({
      where: { userId: user.id },
    });
    if (!profile) continue;

    const address = await prisma.address.findFirst({
      where: { customerId: profile.id, label: 'Home' },
    });
    if (!address) {
      await prisma.address.create({
        data: {
          customerId: profile.id,
          label: 'Home',
          recipientName: scenario.name,
          phone: scenario.phone,
          addressLine: scenario.addressLine,
          divisionId: locations.divisionMap.get(scenario.division) ?? '',
          districtId:
            locations.districtMap.get(
              `${scenario.division}:${scenario.district}`,
            ) ?? '',
          upazilaId:
            locations.upazilaMap.get(
              `${scenario.district}:${scenario.upazila}`,
            ) ?? '',
          postalCode: '1200',
          isDefault: true,
        },
      });
    }

    const addressRecord = await prisma.address.findFirst({
      where: { customerId: profile.id, isDefault: true },
    });
    const orderNumber = makeOrderNumber(index + 1);
    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber },
    });
    if (!existingOrder && index < 8) {
      const productIdA = (
        await prisma.product.findFirst({ where: { sku: 'SP-550-MONO' } })
      )?.id;
      const productIdB = (
        await prisma.product.findFirst({ where: { sku: 'SM-5K-HYB' } })
      )?.id;
      if (productIdA && productIdB && addressRecord) {
        const order = await prisma.order.create({
          data: {
            orderNumber,
            customerId: profile.id,
            addressId: addressRecord.id,
            status: index % 2 === 0 ? 'DELIVERED' : 'CONFIRMED',
            subtotal: money('62000.00'),
            discount: money('0.00'),
            deliveryCharge: money('1500.00'),
            tax: money('0.00'),
            total: money('63500.00'),
            customerNote: 'Customer requested rooftop installation.',
          },
        });

        await prisma.orderItem.createMany({
          data: [
            {
              orderId: order.id,
              productId: productIdA,
              productName: '550W Mono Solar Panel',
              sku: 'SP-550-MONO',
              quantity: 4,
              unitPrice: money('4500.00'),
              discount: money('0.00'),
              total: money('18000.00'),
            },
            {
              orderId: order.id,
              productId: productIdB,
              productName: '5kW Hybrid Inverter',
              sku: 'SM-5K-HYB',
              quantity: 1,
              unitPrice: money('210000.00'),
              discount: money('0.00'),
              total: money('210000.00'),
            },
          ],
        });

        await prisma.inventory.update({
          where: { productId: productIdA },
          data: { quantity: { decrement: 4 } },
        });

        await prisma.inventoryTransaction.create({
          data: {
            productId: productIdA,
            type: 'ORDER_DEDUCTION',
            quantity: 4,
            referenceType: 'ORDER',
            referenceId: order.id,
            reason: 'Order deduction',
            createdById: adminUser?.id,
          },
        });
      }
    }

    if (index < 5) {
      const leadNumber = makeLeadNumber(index + 1);
      await prisma.lead.upsert({
        where: { leadNumber },
        update: { status: 'QUALIFIED' },
        create: {
          leadNumber,
          customerId: profile.id,
          name: scenario.name,
          email: scenario.email,
          phone: scenario.phone,
          divisionId: locations.divisionMap.get(scenario.division) ?? undefined,
          districtId:
            locations.districtMap.get(
              `${scenario.division}:${scenario.district}`,
            ) ?? undefined,
          upazilaId:
            locations.upazilaMap.get(
              `${scenario.district}:${scenario.upazila}`,
            ) ?? undefined,
          propertyType: 'ROOFTOP',
          requirement: 'Need energy solution for home and business backup.',
          budget: money('500000.00'),
          source: 'Website',
          status: 'QUALIFIED',
          notes: 'Interested in new solar installation.',
        },
      });
    }
  }
}

async function seedQuotes() {
  const customers = await prisma.customerProfile.findMany({ take: 10 });
  const quotes = [
    {
      quoteNumber: makeQuoteNumber(1),
      customerId: customers[0]?.id ?? '',
      status: 'DRAFT',
      subtotal: '395000.00',
      tax: '0.00',
      installationCharge: '25000.00',
      deliveryCharge: '5000.00',
      total: '425000.00',
      notes: 'Draft package prepared for client revision.',
      validUntil: new Date('2026-12-31T00:00:00.000Z'),
    },
    {
      quoteNumber: makeQuoteNumber(2),
      customerId: customers[1]?.id ?? '',
      status: 'SENT',
      subtotal: '610000.00',
      tax: '0.00',
      installationCharge: '35000.00',
      deliveryCharge: '5000.00',
      total: '650000.00',
      notes: 'Proposal sent to commercial client.',
      validUntil: new Date('2026-11-30T00:00:00.000Z'),
      sentAt: new Date(),
    },
    {
      quoteNumber: makeQuoteNumber(3),
      customerId: customers[2]?.id ?? '',
      status: 'ACCEPTED',
      subtotal: '420000.00',
      tax: '0.00',
      installationCharge: '30000.00',
      deliveryCharge: '5000.00',
      total: '455000.00',
      notes: 'Client accepted the 3kW home package.',
      validUntil: new Date('2026-12-15T00:00:00.000Z'),
      sentAt: new Date(),
      acceptedAt: new Date(),
    },
    {
      quoteNumber: makeQuoteNumber(4),
      customerId: customers[3]?.id ?? '',
      status: 'REJECTED',
      subtotal: '245000.00',
      tax: '0.00',
      installationCharge: '20000.00',
      deliveryCharge: '5000.00',
      total: '270000.00',
      notes: 'Customer requested revised budget.',
      validUntil: new Date('2026-10-15T00:00:00.000Z'),
      sentAt: new Date(),
      rejectedAt: new Date(),
    },
    {
      quoteNumber: makeQuoteNumber(5),
      customerId: customers[4]?.id ?? '',
      status: 'EXPIRED',
      subtotal: '1320000.00',
      tax: '0.00',
      installationCharge: '55000.00',
      deliveryCharge: '8000.00',
      total: '1383000.00',
      notes: 'Quote expired before payment confirmation.',
      validUntil: new Date('2026-08-01T00:00:00.000Z'),
      sentAt: new Date('2026-07-01T00:00:00.000Z'),
    },
  ];

  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@solar.local' },
  });

  for (const item of quotes) {
    const quote = await prisma.quote.upsert({
      where: { quoteNumber: item.quoteNumber },
      update: {
        status: item.status as
          'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED',
      },
      create: {
        quoteNumber: item.quoteNumber,
        customerId: item.customerId,
        status: item.status as
          'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED',
        subtotal: money(item.subtotal),
        discount: money('0.00'),
        tax: money(item.tax),
        installationCharge: money(item.installationCharge),
        deliveryCharge: money(item.deliveryCharge),
        total: money(item.total),
        notes: item.notes,
        validUntil: item.validUntil,
        sentAt: item.sentAt,
        acceptedAt: item.acceptedAt,
        rejectedAt: item.rejectedAt,
        createdById: adminUser?.id,
      },
    });

    await prisma.quoteItem.createMany({
      data: [
        {
          quoteId: quote.id,
          productId:
            (await prisma.product.findFirst({ where: { sku: 'SP-550-MONO' } }))
              ?.id ?? undefined,
          description: '550W Mono Solar Panel package',
          quantity: 10,
          unitPrice: money('4500.00'),
          discount: money('0.00'),
          total: money('45000.00'),
        },
      ],
    });

    await prisma.quoteStatusHistory.create({
      data: {
        quoteId: quote.id,
        fromStatus: 'DRAFT',
        toStatus: item.status as
          'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED',
        changedById: adminUser?.id,
        note: `Status updated for ${item.quoteNumber}`,
      },
    });
  }
}

async function seedServiceRequests() {
  const customerProfiles = await prisma.customerProfile.findMany({ take: 10 });
  const addressList = await prisma.address.findMany();
  const statuses = [
    'PENDING',
    'QUOTATION_REQUIRED',
    'APPROVED',
    'SCHEDULED',
    'IN_PROGRESS',
    'COMPLETED',
  ] as const;
  const types = [
    'INSTALLATION',
    'REPAIR',
    'MAINTENANCE',
    'INSPECTION',
    'CONSULTATION',
  ] as const;

  for (const [index, profile] of customerProfiles.slice(0, 6).entries()) {
    const request = await prisma.serviceRequest.create({
      data: {
        requestNumber: makeRequestNumber(index + 1),
        customerId: profile.id,
        addressId: addressList[index % addressList.length]?.id,
        type: types[index % types.length],
        status: statuses[index % statuses.length],
        subject: `${types[index % types.length]} request for ${profile.companyName ?? 'customer'}`,
        description:
          'Customer service request created during development seed.',
        preferredDate: new Date(Date.now() + (index + 1) * 86400000),
      },
    });

    await prisma.serviceRequestAttachment.create({
      data: {
        serviceRequestId: request.id,
        objectKey: `service-requests/${request.requestNumber}.jpg`,
        url: `https://images.example.com/${request.requestNumber}.jpg`,
        fileName: `${request.requestNumber}.jpg`,
        mimeType: 'image/jpeg',
        size: 120000,
      },
    });
  }
}

async function seedInstallations() {
  const customers = await prisma.customerProfile.findMany({ take: 6 });
  const packageList = await prisma.solarPackage.findMany();
  const addressList = await prisma.address.findMany();
  const productList = await prisma.product.findMany({ take: 5 });

  for (const [index, profile] of customers.entries()) {
    if (index >= 4) break;

    const installation = await prisma.installation.create({
      data: {
        installationNumber: makeInstallationNumber(index + 1),
        customerId: profile.id,
        addressId: addressList[index % addressList.length]?.id,
        packageId: packageList[index % packageList.length]?.id,
        installationDate: new Date(),
        status: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'COMPLETED'][
          index
        ] as 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED',
        notes: 'Seeded installation record',
      },
    });

    for (const [idx, product] of productList.entries()) {
      if (idx >= 2) break;
      await prisma.installationItem.create({
        data: {
          installationId: installation.id,
          productId: product.id,
          quantity: index + 1,
          serialNumber: `SER-${index + 1}-${idx + 1}`,
          notes: 'Installed during development seed',
        },
      });
    }

    await prisma.installationPhoto.create({
      data: {
        installationId: installation.id,
        objectKey: `installations/${installation.installationNumber}.jpg`,
        url: `https://images.example.com/${installation.installationNumber}.jpg`,
        caption: 'Completed installation',
      },
    });
  }
}

async function seedProjectsAndWarranties() {
  const customers = await prisma.customerProfile.findMany({ take: 5 });
  const projects = [
    {
      projectNumber: 'PRJ-2026-000001',
      name: '50kW Factory Solar Project',
      customerIndex: 0,
      status: 'INSTALLATION',
      capacityKw: '50.00',
      value: '18500000.00',
    },
    {
      projectNumber: 'PRJ-2026-000002',
      name: '20kW Commercial Solar Project',
      customerIndex: 1,
      status: 'COMPLETED',
      capacityKw: '20.00',
      value: '7200000.00',
    },
  ];

  for (const projectSeed of projects) {
    const customerId = customers[projectSeed.customerIndex]?.id;
    if (!customerId) continue;

    const project = await prisma.project.create({
      data: {
        projectNumber: projectSeed.projectNumber,
        customerId,
        name: projectSeed.name,
        description: 'Commercial solar project seeded for development.',
        capacityKw: money(projectSeed.capacityKw),
        status: projectSeed.status as 'INSTALLATION' | 'COMPLETED',
        estimatedValue: money(projectSeed.value),
        notes: 'Seeded project record',
      },
    });

    const product = await prisma.product.findFirst({
      where: { sku: 'SP-550-MONO' },
    });
    if (product) {
      await prisma.projectItem.create({
        data: {
          projectId: project.id,
          productId: product.id,
          description: 'Solar module bundle for project',
          quantity: projectSeed.status === 'COMPLETED' ? 30 : 40,
          unitPrice: money('4500.00'),
          total: money('135000.00'),
        },
      });
    }
  }

  const products = await prisma.product.findMany({ take: 5 });
  const orders = await prisma.order.findMany({ take: 4 });
  const installations = await prisma.installation.findMany({ take: 4 });

  for (const [index, product] of products.entries()) {
    if (index >= 5) break;
    const warrantyNumber = makeWarrantyNumber(index + 1);
    const warranty = await prisma.warranty.create({
      data: {
        warrantyNumber,
        customerId: customers[index % customers.length]?.id ?? customers[0].id,
        productId: product.id,
        orderId: orders[index % orders.length]?.id,
        installationId: installations[index % installations.length]?.id,
        serialNumber: `WARR-${index + 1}`,
        purchaseDate: new Date(),
        warrantyStart: new Date(),
        warrantyEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status:
          index % 3 === 0 ? 'ACTIVE' : index % 3 === 1 ? 'EXPIRED' : 'VOID',
      },
    });

    if (index < 2) {
      await prisma.warrantyClaim.create({
        data: {
          claimNumber: `CLM-${index + 1}`,
          warrantyId: warranty.id,
          problem: 'Panel performance lower than expected.',
          status: index === 0 ? 'NEW' : 'RESOLVED',
          resolution:
            index === 0 ? null : 'Inspect and replace damaged connector.',
          adminNotes: 'Field inspection scheduled.',
          resolvedAt: index === 0 ? null : new Date(),
        },
      });
    }
  }
}

async function seedReviewsAndNotifications() {
  const customers = await prisma.customerProfile.findMany({ take: 8 });
  const products = await prisma.product.findMany({ take: 8 });
  const users = await prisma.user.findMany({ take: 6 });

  for (const [index, customer] of customers.entries()) {
    const product = products[index % products.length];
    if (!product) continue;

    await prisma.review.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        rating: 3 + (index % 3),
        title: `Review ${index + 1}`,
        comment:
          'The system is working well and installation quality was good.',
        status: index % 2 === 0 ? 'APPROVED' : 'PENDING',
      },
    });
  }

  for (const [index, user] of users.entries()) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: [
          'Quote accepted',
          'Order confirmed',
          'Service scheduled',
          'Warranty updated',
        ][index % 4],
        title: 'Business update',
        message: 'Your solar project has a new status update.',
        data: { refType: 'quote', refId: `seed-${index + 1}` },
      },
    });
  }
}

async function seedPaymentsBlogsContactsSettings() {
  const orders = await prisma.order.findMany({ take: 5 });
  const quotes = await prisma.quote.findMany({ take: 5 });
  const author = await prisma.user.findUnique({
    where: { email: 'superadmin@solar.local' },
  });

  for (const [index, order] of orders.entries()) {
    await prisma.paymentRecord.create({
      data: {
        orderId: order.id,
        amount: money('50000.00'),
        currency: 'BDT',
        method: 'BANK_TRANSFER',
        status: ['PENDING', 'PAID', 'FAILED'][index % 3] as
          'PENDING' | 'PAID' | 'FAILED',
        transactionReference: `TXN-${index + 1}`,
        provider: 'Banking Partner',
        metadata: { channel: 'offline' },
      },
    });
  }

  for (const [index, quote] of quotes.entries()) {
    await prisma.paymentRecord.create({
      data: {
        quoteId: quote.id,
        amount: money('15000.00'),
        currency: 'BDT',
        method: 'CASH',
        status: 'PENDING',
        transactionReference: `QTXN-${index + 1}`,
        provider: 'Sales Desk',
        metadata: { source: 'lead' },
      },
    });
  }

  const blogTopics = [
    'Benefits of solar energy in Bangladesh',
    'How to choose the right solar inverter',
    'Solar panel maintenance checklist',
    'On-grid vs hybrid solar systems',
    'Solar power solutions for businesses',
  ];

  for (const [index, topic] of blogTopics.entries()) {
    await prisma.blogPost.upsert({
      where: {
        slug: topic
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      },
      update: {},
      create: {
        authorId: author?.id ?? '',
        title: topic,
        slug: topic
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        excerpt: `${topic} for local commercial and residential solar projects.`,
        content:
          'This development content is intentionally fictional and designed for local testing.',
        featuredImageUrl: `https://images.example.com/blog-${index + 1}.jpg`,
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }

  const contactStatuses = ['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
  for (const [index, status] of contactStatuses.entries()) {
    await prisma.contactRequest.create({
      data: {
        name: `Contact Person ${index + 1}`,
        email: `contact${index + 1}@solar.local`,
        phone: `017100000${index + 11}`,
        subject: 'General solar enquiry',
        message: 'Looking for a solar energy discussion with the sales team.',
        status,
        handledById: author?.id,
        handledAt:
          status === 'RESOLVED' || status === 'CLOSED' ? new Date() : null,
      },
    });
  }

  const settingDefinitions = [
    {
      key: 'company.name',
      value: 'Solar Horizon BD',
      type: 'STRING',
      description: 'Company name',
      isPublic: true,
    },
    {
      key: 'company.phone',
      value: '+8801700000000',
      type: 'STRING',
      description: 'Company phone',
      isPublic: true,
    },
    {
      key: 'company.email',
      value: 'hello@solarhorizonbd.local',
      type: 'STRING',
      description: 'Company email',
      isPublic: true,
    },
    {
      key: 'company.address',
      value: 'Dhaka, Bangladesh',
      type: 'STRING',
      description: 'Company address',
      isPublic: true,
    },
    {
      key: 'business.currency',
      value: 'BDT',
      type: 'STRING',
      description: 'Default currency',
      isPublic: true,
    },
    {
      key: 'business.vat',
      value: '5',
      type: 'NUMBER',
      description: 'VAT percentage',
      isPublic: false,
    },
    {
      key: 'business.delivery_charge',
      value: '1500',
      type: 'NUMBER',
      description: 'Delivery charge in BDT',
      isPublic: false,
    },
    {
      key: 'social.facebook',
      value: 'https://facebook.com/solarhorizonbd',
      type: 'STRING',
      description: 'Facebook page',
      isPublic: true,
    },
  ];

  for (const setting of settingDefinitions) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: {
        value: setting.value,
        type: setting.type as 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON',
        description: setting.description,
        isPublic: setting.isPublic,
      },
      create: {
        key: setting.key,
        value: setting.value,
        type: setting.type as 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON',
        description: setting.description,
        isPublic: setting.isPublic,
        updatedById: author?.id,
      },
    });
  }
}

async function seedSolarCalculations() {
  const customerProfiles = await prisma.customerProfile.findMany({ take: 5 });

  for (const [index, customer] of customerProfiles.entries()) {
    await prisma.solarCalculation.create({
      data: {
        customerId: customer.id,
        estimatedLoadKw: money(`${index + 2}.5`),
        dailyEnergyKwh: money(`${index * 8 + 15}`),
        recommendedCapacityKw: money(`${index + 3}.5`),
        estimatedPanelCount: 12 + index * 4,
        inputs: { roofArea: '120 sq ft', location: 'Dhaka', shading: 'low' },
        result: {
          recommendation: '5kW hybrid system',
          annualSavings: 'BDT 75000',
        },
      },
    });
  }
}

async function main() {
  await seedRolesAndPermissions();
  await seedUsers(new Map());
  const { roleMap } = await seedRolesAndPermissions();
  await seedUsers(roleMap);
  const { categoryMap, brandMap } = await seedCategoriesAndBrands();
  const productMap = await seedProducts(categoryMap, brandMap);
  await seedPackages(productMap);
  await seedCustomerScenarios();
  await seedQuotes();
  await seedServiceRequests();
  await seedInstallations();
  await seedProjectsAndWarranties();
  await seedReviewsAndNotifications();
  await seedPaymentsBlogsContactsSettings();
  await seedSolarCalculations();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
