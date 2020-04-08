﻿using MI.Server.DataAccess.DbObjects.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public GradeEnum StudentClass { get; set; }

        public bool SignDone { get; set; }
    }
}
