import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma.js";

const DEMO_PASSWORD = "Password123!";

async function main() {
  console.log("Start seeding CampusFlow demo data...");

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  const organization = await prisma.organization.upsert({
    where: {
      code: "CAMPUSFLOW",
    },
    update: {},
    create: {
      name: "CampusFlow Demo Organization",
      code: "CAMPUSFLOW",
      description: "Demo organization for CampusFlow portfolio project.",
    },
  });

  const itDepartment = await prisma.department.upsert({
    where: {
      id: "demo-it-department",
    },
    update: {},
    create: {
      id: "demo-it-department",
      organizationId: organization.id,
      name: "IT Department",
      description: "Responsible for IT support and technical issues.",
    },
  });

  const facilityDepartment = await prisma.department.upsert({
    where: {
      id: "demo-facility-department",
    },
    update: {},
    create: {
      id: "demo-facility-department",
      organizationId: organization.id,
      name: "Facility Department",
      description: "Responsible for building, room, and maintenance work.",
    },
  });

  const mainOffice = await prisma.location.upsert({
    where: {
      id: "demo-main-office",
    },
    update: {},
    create: {
      id: "demo-main-office",
      organizationId: organization.id,
      name: "Main Office",
      building: "Building A",
      floor: "1",
      room: "A101",
      description: "Main office location for demo data.",
    },
  });

  const computerLab = await prisma.location.upsert({
    where: {
      id: "demo-computer-lab",
    },
    update: {},
    create: {
      id: "demo-computer-lab",
      organizationId: organization.id,
      name: "Computer Lab",
      building: "Building B",
      floor: "3",
      room: "B301",
      description: "Computer lab location for demo repair tickets.",
    },
  });

  await prisma.user.upsert({
    where: {
      email: "admin@campusflow.dev",
    },
    update: {
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
    create: {
      name: "CampusFlow Admin",
      email: "admin@campusflow.dev",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
      organizationId: organization.id,
      departmentId: facilityDepartment.id,
      locationId: mainOffice.id,
    },
  });

  await prisma.user.upsert({
    where: {
      email: "technician@campusflow.dev",
    },
    update: {
      passwordHash,
      role: "TECHNICIAN",
      status: "ACTIVE",
    },
    create: {
      name: "CampusFlow Technician",
      email: "technician@campusflow.dev",
      passwordHash,
      role: "TECHNICIAN",
      status: "ACTIVE",
      organizationId: organization.id,
      departmentId: itDepartment.id,
      locationId: computerLab.id,
    },
  });

  await prisma.user.upsert({
    where: {
      email: "user@campusflow.dev",
    },
    update: {
      passwordHash,
      role: "USER",
      status: "ACTIVE",
    },
    create: {
      name: "CampusFlow User",
      email: "user@campusflow.dev",
      passwordHash,
      role: "USER",
      status: "ACTIVE",
      organizationId: organization.id,
      departmentId: itDepartment.id,
      locationId: computerLab.id,
    },
  });

  await prisma.user.upsert({
    where: {
      email: "manager@campusflow.dev",
    },
    update: {
      passwordHash,
      role: "MANAGER",
      status: "ACTIVE",
    },
    create: {
      name: "CampusFlow Manager",
      email: "manager@campusflow.dev",
      passwordHash,
      role: "MANAGER",
      status: "ACTIVE",
      organizationId: organization.id,
      departmentId: facilityDepartment.id,
      locationId: mainOffice.id,
    },
  });

  const ticketCategories = [
    {
      name: "IT",
      description:
        "Computer, software, hardware, and technical support issues.",
    },
    {
      name: "Electrical",
      description: "Electrical system, light, power outlet, and wiring issues.",
    },
    {
      name: "Air Conditioner",
      description: "Air conditioner repair and maintenance issues.",
    },
    {
      name: "Plumbing",
      description: "Water, pipe, toilet, and plumbing issues.",
    },
    {
      name: "Internet",
      description: "Network, Wi-Fi, router, and internet connection issues.",
    },
    {
      name: "Furniture",
      description: "Desk, chair, cabinet, and furniture issues.",
    },
    {
      name: "Other",
      description: "Other repair or maintenance requests.",
    },
  ];

  for (const category of ticketCategories) {
    await prisma.ticketCategory.upsert({
      where: {
        name: category.name,
      },
      update: {
        description: category.description,
        isActive: true,
      },
      create: {
        name: category.name,
        description: category.description,
        isActive: true,
      },
    });
  }

  const assetCategories = [
    {
      name: "Computer Equipment",
      description:
        "Desktop computers, notebooks, monitors, and shared workstations.",
    },
    {
      name: "Network Devices",
      description: "Routers, switches, access points, and network equipment.",
    },
    {
      name: "Projectors",
      description: "Classroom and meeting room projector equipment.",
    },
    {
      name: "Air Conditioners",
      description: "Air conditioner units and related cooling equipment.",
    },
    {
      name: "Office Equipment",
      description: "Printers, scanners, desks, chairs, and office devices.",
    },
  ];

  for (const category of assetCategories) {
    await prisma.assetCategory.upsert({
      where: {
        name: category.name,
      },
      update: {
        description: category.description,
        isActive: true,
      },
      create: {
        name: category.name,
        description: category.description,
        isActive: true,
      },
    });
  }

  console.log("CampusFlow demo data seeded successfully.");
  console.log("");
  console.log("Demo accounts:");
  console.log("Admin: admin@campusflow.dev / Password123!");
  console.log("Technician: technician@campusflow.dev / Password123!");
  console.log("User: user@campusflow.dev / Password123!");
  console.log("Manager: manager@campusflow.dev / Password123!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
