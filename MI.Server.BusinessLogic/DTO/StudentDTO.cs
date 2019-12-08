using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class StudentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public GradeEnum Grade { get; set; }
    }
}
