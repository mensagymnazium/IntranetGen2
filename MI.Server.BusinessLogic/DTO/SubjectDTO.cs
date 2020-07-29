using MI.Server.DataAccess.DbObjects.Enums;
using System.Collections.Generic;

namespace MI.Server.BusinessLogic.DTO
{
    public class SubjectDto
    {
        public int? Id { get; set; }
        public int? Capacity { get; set; }
        public SubjectCategoryEnum Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int EnrolledStudents { get; set; }
        public DayEnum Day { get; set; }
        public PeriodEnum Period { get; set; }
        public string Teacher { get; set; }
        public List<SubjectTypeEnum> Type { get; set; } = new List<SubjectTypeEnum>();
        public List<GradeEnum> Grades { get; set; } = new List<GradeEnum>();
        public SignupSubjectsDto SignedStudents { get; set;}
    }
}
