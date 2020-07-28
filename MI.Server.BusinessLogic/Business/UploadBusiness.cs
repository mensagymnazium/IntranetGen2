using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using MI.Server.DataAccess.Database;

namespace MI.Server.BusinessLogic.Business
{
    public class UploadBusiness
    {
        private readonly MensaIntranetContext _context;

        internal UploadBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public async Task<ProcessAsyncHelper.ProcessResult> ProcessFile(string directoryPath, string filePath)
        {
            var extractedPath = Path.Combine(directoryPath, "Extracted");
            ZipFile.ExtractToDirectory(filePath, extractedPath);

            var csfile = Directory.GetFiles(extractedPath, "*.csproj", SearchOption.AllDirectories);

            if (csfile.Length == 0)
            {
                var returnValue = new ProcessAsyncHelper.ProcessResult();
                returnValue.Output = "No .csproj found";
            }
            var result = await ProcessAsyncHelper.ExecuteShellCommand("dotnet", $"run --project \"{csfile.FirstOrDefault()}\" ", 60000);
            var msg = result.Output;

            Directory.Delete(directoryPath, true);

            return result;
        }
    }
}