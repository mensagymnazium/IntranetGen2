using System;
using System.Collections.Generic;
using System.Text;

namespace MI.Server.BusinessLogic.DTO
{
    public class SignupSubjectsDto
    {
        public string SubjectName { get; set; }

        public List<string> PrimaryStudents { get; set; }

        public List<string> SecondaryStudents { get; set; }

    }
}
