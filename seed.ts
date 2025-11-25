/**
 * ! Executing this script will delete all data in your database and seed it with mock data.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { copycat } from "@snaplet/copycat";
import { Agent, Asset, PrismaClient, User } from "./generated/prisma";

const prisma = new PrismaClient();

const main = async () => {
    try {
        // Reset all data (truncate tables)
        await prisma.favorite.deleteMany();
        await prisma.carAsset.deleteMany();
        await prisma.realEstateAsset.deleteMany();
        await prisma.asset.deleteMany();
        await prisma.agent.deleteMany();
        await prisma.user.deleteMany();

        console.log("Cleared all existing data");

        // Create users with various roles
        const userData = Array.from({ length: 20 }, (_, i) => ({
            email: copycat.email(`user-${i}`),
            name: copycat.fullName(`user-${i}`),
            phone: copycat.phoneNumber(`user-${i}`, { length: 11 }),
            profileImage: copycat.url(`user-${i}`),
            provider: copycat.oneOf(`user-provider-${i}`, [
                "APPLE",
                "GOOGLE",
                "LOCAL",
                null,
            ]) as "APPLE" | "GOOGLE" | "LOCAL" | null,
            role: copycat.oneOf(`user-role-${i}`, [
                "NORMAL",
                "AGENT",
                "OWNER",
                "ADMIN",
            ]) as "NORMAL" | "AGENT" | "OWNER" | "ADMIN",
        }));

        const users = await Promise.all(
            userData.map((data) => prisma.user.create({ data }))
        );

        console.log(`Created ${users.length} users`);

        // Create agents (only for users with AGENT role)
        const agentUsers = users.filter((u: User) => u.role === "AGENT");
        const agentData = agentUsers.map((user: User, i: number) => ({
            userId: user.id,
            officeName: copycat.firstName(`agent-${i}`) + " 부동산",
            licenseNumber: Array.from({ length: 12 }, (_, j) =>
                copycat.digit(`agent-license-${i}-${j}`)
            ).join(""),
            officePhone: copycat.phoneNumber(`agent-phone-${i}`, {
                length: 11,
            }),
            officeAddress: `${copycat.firstName(
                `agent-city-${i}`
            )} ${copycat.lastName(`agent-street-${i}`)}`,
            verified: copycat.bool(`agent-verified-${i}`),
        }));

        const agents = await Promise.all(
            agentData.map((data: any) => prisma.agent.create({ data }))
        );

        console.log(`Created ${agents.length} agents`);

        // Create assets (mix of real estate, car, and etc)
        const assetData = Array.from({ length: 30 }, (_, i) => {
            const category = copycat.oneOf(`asset-category-${i}`, [
                "REAL_ESTATE",
                "CAR",
                "ETC",
            ]) as "REAL_ESTATE" | "CAR" | "ETC";
            const userId = copycat.oneOf(
                `asset-user-${i}`,
                users.map((u: User) => u.id)
            );
            let agentId: number | null = null;

            // Only assign agent for real estate assets
            if (category === "REAL_ESTATE" && agents.length > 0) {
                agentId = copycat.oneOf(`asset-agent-${i}`, [
                    ...agents.map((a: Agent) => a.id),
                    null,
                ]);
            }

            return {
                title: copycat.username(`asset-title-${i}`),
                description: copycat.email(`asset-desc-${i}`),
                category,
                userId,
                agentId,
            };
        });

        const assets = await Promise.all(
            assetData.map((data) => prisma.asset.create({ data }))
        );

        console.log(`Created ${assets.length} assets`);

        // Create real estate assets
        const realEstateAssets = assets.filter(
            (a: Asset) => a.category === "REAL_ESTATE"
        );
        const realEstateData = realEstateAssets.map(
            (asset: Asset, i: number) => ({
                assetId: asset.id,
                deposit: copycat.int(`re-deposit-${i}`, {
                    min: 10000000,
                    max: 500000000,
                }),
                rent: copycat.oneOf(`re-rent-${i}`, [
                    copycat.int(`re-rent-val-${i}`, {
                        min: 300000,
                        max: 2000000,
                    }),
                    null,
                ]),
                maintenanceFee: copycat.oneOf(`re-maintenance-${i}`, [
                    copycat.int(`re-maintenance-val-${i}`, {
                        min: 50000,
                        max: 300000,
                    }),
                    null,
                ]),
                address: `${copycat.firstName(
                    `re-city-${i}`
                )} ${copycat.lastName(`re-street-${i}`)}`,
                lat: copycat.float(`re-lat-${i}`, { min: 33.0, max: 38.0 }),
                lng: copycat.float(`re-lng-${i}`, { min: 124.0, max: 132.0 }),
                buildingType: copycat.oneOf(`re-building-${i}`, [
                    "아파트",
                    "오피스텔",
                    "원룸",
                    "빌라",
                    "단독주택",
                    null,
                ]),
                yearBuilt: copycat.oneOf(`re-year-${i}`, [
                    copycat.int(`re-year-val-${i}`, { min: 1980, max: 2024 }),
                    null,
                ]),
                totalFloors: copycat.oneOf(`re-total-floors-${i}`, [
                    copycat.int(`re-total-floors-val-${i}`, {
                        min: 1,
                        max: 50,
                    }),
                    null,
                ]),
                floor: copycat.oneOf(`re-floor-${i}`, [
                    copycat.int(`re-floor-val-${i}`, { min: 1, max: 30 }),
                    null,
                ]),
                roomType: copycat.oneOf(`re-room-${i}`, [
                    "원룸",
                    "투룸",
                    "쓰리룸",
                    "포룸",
                    null,
                ]),
                supplyArea: copycat.oneOf(`re-supply-${i}`, [
                    copycat.float(`re-supply-val-${i}`, {
                        min: 15.0,
                        max: 200.0,
                    }),
                    null,
                ]),
                exclusiveArea: copycat.oneOf(`re-exclusive-${i}`, [
                    copycat.float(`re-exclusive-val-${i}`, {
                        min: 10.0,
                        max: 150.0,
                    }),
                    null,
                ]),
                parking: copycat.oneOf(`re-parking-${i}`, [
                    "가능",
                    "불가능",
                    "협의",
                    null,
                ]),
                pet: copycat.oneOf(`re-pet-${i}`, [true, false, null]),
                elevator: copycat.oneOf(`re-elevator-${i}`, [
                    true,
                    false,
                    null,
                ]),
                shortTerm: copycat.oneOf(`re-short-${i}`, [true, false, null]),
            })
        );

        await Promise.all(
            realEstateData.map((data: any) =>
                prisma.realEstateAsset.create({ data })
            )
        );

        console.log(`Created ${realEstateAssets.length} real estate assets`);

        // Create car assets
        const carAssets = assets.filter((a: Asset) => a.category === "CAR");
        const carData = carAssets.map((asset: Asset, i: number) => ({
            assetId: asset.id,
            brand: copycat.oneOf(`car-brand-${i}`, [
                "현대",
                "기아",
                "BMW",
                "벤츠",
                "아우디",
                "테슬라",
                "제네시스",
            ]),
            model: copycat.oneOf(`car-model-${i}`, [
                "소나타",
                "캠리",
                "아반떼",
                "그랜저",
                "제네시스",
                "X5",
                "E클래스",
                "A4",
                "모델3",
            ]),
            year: copycat.int(`car-year-${i}`, { min: 2015, max: 2024 }),
            mileage: copycat.int(`car-mileage-${i}`, { min: 0, max: 200000 }),
            fuelType: copycat.oneOf(`car-fuel-${i}`, [
                "가솔린",
                "디젤",
                "전기",
                "하이브리드",
                "LPG",
                null,
            ]),
            transmission: copycat.oneOf(`car-transmission-${i}`, [
                "자동",
                "수동",
                "CVT",
                "DCT",
                null,
            ]),
            color: copycat.oneOf(`car-color-${i}`, [
                "흰색",
                "검은색",
                "은색",
                "회색",
                "빨간색",
                "파란색",
                null,
            ]),
            price: copycat.int(`car-price-${i}`, {
                min: 5000000,
                max: 100000000,
            }),
            condition: copycat.oneOf(`car-condition-${i}`, [
                "새차",
                "중고",
                "렌트",
                null,
            ]),
            accidentHistory: copycat.oneOf(`car-accident-${i}`, [
                true,
                false,
                null,
            ]),
        }));

        await Promise.all(
            carData.map((data: any) => prisma.carAsset.create({ data }))
        );

        console.log(`Created ${carAssets.length} car assets`);

        // Create favorites (users can favorite multiple assets)
        const favoriteData = Array.from({ length: 50 }, (_, i) => ({
            userId: copycat.oneOf(
                `favorite-user-${i}`,
                users.map((u: User) => u.id)
            ),
            assetId: copycat.oneOf(
                `favorite-asset-${i}`,
                assets.map((a: Asset) => a.id)
            ),
        }));

        // Remove duplicates (same user can't favorite same asset twice)
        const uniqueFavorites = Array.from(
            new Map(
                favoriteData.map((f) => [`${f.userId}-${f.assetId}`, f])
            ).values()
        );

        await Promise.all(
            uniqueFavorites.map((data) => prisma.favorite.create({ data }))
        );

        console.log(`Created ${uniqueFavorites.length} favorites`);

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

main();
