using System;

namespace MI.Server.BusinessLogic.DTO
{
    public class SubmissionDto : BaseDto
    {
        public string FilePath { get; set; }

        public string Score { get; set; }

        public DateTime UploadTime { get; set; }

        public string Note { get; set; }

        public string ResultMessage { get; set; }

        public int NumberOfUploads { get; set; }

        public int RunTime { get; set; }

        public UserDto User { get; set; }

        public AssignmentDto Assignment { get; set; }
    }
}