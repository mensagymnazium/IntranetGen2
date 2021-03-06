using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class SigningRulesDto
    {
        public int? Id { get; set; }

        public List<SubjectCategoryEnum> Category { get; set; } = new List<SubjectCategoryEnum>();
        public GradeEnum Grade { get; set; }
        public int? Quantity { get; set; }
        public List<SubjectTypeEnum> Type { get; set; } = new List<SubjectTypeEnum>();
    }
}
