import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class StudSubjModel {
constructor(


        public studSubjId: number,
                public schoolGroupId: number,
                public customerAccountId: number,
                public subjectId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

