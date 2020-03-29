﻿using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class SigningRulesDto
    {
        public int? Id { get; set; }
        public GradeEnum Grade { get; set; }
        public List<SubjectTypeEnum> Type { get; set; } = new List<SubjectTypeEnum>();

        public int? Quantity { get; set; }

        public bool? Required { get; set; }
    }
}
