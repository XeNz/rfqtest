import { RfqDto } from '../models/models';
import { randomIntFromInterval } from '../utils/RandomUtils';

class RfqService {

    getRfqs(): Array<RfqDto> {
        let mutable: RfqDto = {
            rfqId: 1,
            bestQuotePrice: 1000,
            projectName: "test project",
            supplierName: "FE",
            targetPrice: 3000
        };

        const locked = {
            rfqId: 2,
            bestQuotePrice: 4000,
            projectName: "other test project",
            supplierName: "FE",
            targetPrice: 3000,
            lockedBy: {
                avatar: "https://i.redd.it/9sni9nk5jmux.jpg",
                fullName: "Alexander Willemsen",
                userId: 1
            },
            lockedUntil: new Date("2021-09-07T08:15:30+02:00")
        };
        let rnd = randomIntFromInterval(1, 2);
        if (rnd === 1) {
            mutable.lockedUntil = new Date("2021-09-07T08:15:30+02:00")
            mutable.lockedBy = {
                avatar: "https://i.redd.it/9sni9nk5jmux.jpg",
                fullName: "Alexander Willemsen",
                userId: 1
            }
        }
        const rfqs: Array<RfqDto> = [
            mutable, locked

        ]
        return rfqs;
    }
}

export const rfqService = new RfqService();

