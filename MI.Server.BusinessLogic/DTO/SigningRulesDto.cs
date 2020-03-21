using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class SigningRulesDto
    {
        public int? Id { get; set; }
        public GradeEnum Grade { get; set; }
        public SubjectTypeEnum Type { get; set; }

        public int? Quantity { get; set; }
    }
}
