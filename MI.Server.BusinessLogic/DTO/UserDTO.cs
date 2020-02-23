using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class UserDto
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public GradeEnum StudentClass { get; set; }
    }
}
