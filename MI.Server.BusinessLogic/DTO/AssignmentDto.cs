using System;
using System.Collections.Generic;
using MI.Server.DataAccess.DbObjects.Entities;

namespace MI.Server.BusinessLogic.DTO
{
    public class AssignmentDto
    {
        public string Name { get; set; }

        public DateTime Deadline { get; set; }

        public DateTime ActiveFrom { get; set; }

        public string SolutionPath { get; set; }

        public int MaxNumberOfUploads { get; set; }

        public bool Required { get; set; }

        public IEnumerable<SubmissionDto> Submissions { get; set; }
    }
}