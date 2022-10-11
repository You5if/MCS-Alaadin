export class loadPlanModel {
    constructor(
        //step 5 of security(next: login.component.ts > submit)
        public id: any,
        public photo: any,
        public date: any,
        public model: any,
        public lot: any,
        public vin: any,
        public pol: any,
        public auction: any,
        public destinationPort: any,
        public contNUm: any,
        public promisedPickup: any,
        public deliveredToWare: any,
        public arrDate: any,
        public unloadingDate: any,
        public dock: any,
        public status: any,
        public titleRec: any,
        public keys: any,
        public action: any,
        public notes: any,
        public invoiceForAuto: any,
        public autoPrice: any,
        public paid: any,
        public sold: any,
        public clientNote: any,
        public terNotes: any
        
    ) { }
}
export class WarehouseDetModel {
    constructor(
        //step 5 of security(next: login.component.ts > submit)
        public warehouse: string,
        public sysWarehouseId: number,
        public all: number = 0,
        public dispatched: number= 0,
        public loaded: number= 0,
        public newCount: number= 0,
        public terminal: number= 0,
        
    ) { }
}
