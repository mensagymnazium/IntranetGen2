using System;

namespace MI.Server.BusinessLogic.DTO
{
    public class SubmissionDto : BaseDto
    {
        public string FilePath { get; set; }

        public int Score { get; set; }

        public string UploadTime { get; set; }

        public string Note { get; set; }

        public string ResultMessage { get; set; }

        public int NumberOfUploads { get; set; }

        public double RunTime { get; set; }

        public UserDto User { get; set; }

    }
}