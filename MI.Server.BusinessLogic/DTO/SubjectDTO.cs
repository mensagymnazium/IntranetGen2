using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class SubjectDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public TeacherDTO Teacher { get; set; }
        public PeriodDTO Period { get; set; }
        public List<GradeEnum> Grades { get; set; }
    }
}
