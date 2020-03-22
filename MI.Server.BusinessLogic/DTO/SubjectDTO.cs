using MI.Server.DataAccess.DbObjects.Enums;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class SubjectDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Capacity { get; set; }
        public int EnrolledStudents { get; set; }
        public DayEnum Day { get; set; }

        public PeriodEnum Period { get; set; }

        public List<SubjectTypeEnum> Type { get; set; } = new List<SubjectTypeEnum>();
        public string Teacher { get; set; }

        public List<GradeEnum> Grades { get; set; } = new List<GradeEnum>();
    }
}
