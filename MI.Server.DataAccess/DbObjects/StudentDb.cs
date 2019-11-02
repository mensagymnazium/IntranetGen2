using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects
{
    public class StudentDb : UserBase
    {
        public enum GradeEnum
        {
            Prima = 10,
            Sekunda = 20,
            Tercie = 30,
            Kvarta = 40,
            Kvinta = 50,
            Sexta = 60,
            Septima = 70,
            Oktava = 80
        }
        public virtual IList<SubjectDb> Subjects { get; set; }
        public GradeEnum StudentClass { get; set; }
        public IList<EnrollementDb> Enrollements { get; set; }
    }
}
