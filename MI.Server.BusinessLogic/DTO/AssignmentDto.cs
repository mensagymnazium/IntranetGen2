using System;
using System.Collections.Generic;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;

namespace MI.Server.BusinessLogic.DTO
{
    public class AssignmentDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Deadline { get; set; }

        public string ActiveFrom { get; set; }

        public int MaxNumberOfUploads { get; set; }

        public ProgrammingGroup Group { get; set; }

        public string Url { get; set; }

        public string SolutionPath { get; set; }

        public bool Required { get; set; }

        public IEnumerable<SubmissionDto> Submissions { get; set; }
    }
}