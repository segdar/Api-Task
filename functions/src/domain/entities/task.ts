export class Task {
  
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public date_creation: Date,
        public status: number,
        public user_creation: string
    ) {
       
    }
}

