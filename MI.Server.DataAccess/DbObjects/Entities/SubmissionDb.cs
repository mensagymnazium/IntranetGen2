using System;

namespace MI.Server.DataAccess.DbObjects.Entities
{
    public class SubmissionDb : DbBase
    {
        public string FilePath { get; set; }

        public int Score { get; set; }

        public DateTime UploadTime { get; set; }

        public string Note { get; set; }

        public string ResultMessage { get; set; }

        public int NumberOfUploads { get; set; }

        public int RunTime { get; set; }

        public UserDb User { get; set; }

        public AssignmentDb Assignment { get; set; }
    }
}