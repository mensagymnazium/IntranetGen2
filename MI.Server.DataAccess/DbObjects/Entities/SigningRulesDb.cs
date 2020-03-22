using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class SigningRulesDb : DbBase
    {
        public GradeEnum GradeEnum { get; set; }
        public SubjectTypeEnum Type { get; set; }
        public int? Quantity { get; set; }
    }
}
