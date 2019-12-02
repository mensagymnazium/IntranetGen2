using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public struct PeriodDTO
    {
        public DayEnum Day { get; set; }
        public PeriodEnum Period { get; set; }
    }
}
