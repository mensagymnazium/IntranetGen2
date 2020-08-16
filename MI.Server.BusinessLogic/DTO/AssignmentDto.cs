using System;
using System.Collections.Generic;
using MI.Server.DataAccess.DbObjects.Entities;

namespace MI.Server.BusinessLogic.DTO
{
    public class AssignmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Deadline { get; set; }

        public string ActiveFrom { get; set; }

        public int MaxNumberOfUploads { get; set; }

        public bool Required { get; set; }

        public IEnumerable<SubmissionDto> Submissions { get; set; }
    }
}