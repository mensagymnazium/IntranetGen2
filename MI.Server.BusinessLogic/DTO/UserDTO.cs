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

        public string Email { get; set; }

        public GradeEnum StudentClass { get; set; }

        public string SignDone { get; set; }

        public List<string> PrimarySubjects { get; set; } = new List<string>();

        public List<string> SecondarySubjects { get; set; } = new List<string>();

        public IEnumerable<SubmissionDto> Submissions { get; set; }
    }
}
