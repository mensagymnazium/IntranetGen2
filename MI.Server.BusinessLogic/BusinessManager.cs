using AutoMapper;
using MI.Server.BusinessLogic.Business;
using MI.Server.DataAccess.Database;
using Microsoft.Extensions.Configuration;

namespace MI.Server.BusinessLogic
{
    public class BusinessManager
    {
        private readonly MensaIntranetContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public SubjectBusiness SubjectBusiness => new SubjectBusiness(_context);
        public SignupBusiness SignupBusiness => new SignupBusiness(_context);
        public UserBusiness UserBusiness => new UserBusiness(_context);

        public SigningRulesBusiness SigningRulesBusiness => new SigningRulesBusiness(_context);
        public SubmissionBusiness SubmissionBusiness => new SubmissionBusiness(_context, _mapper, _configuration);
        public AssignmentBusiness AssignmentBusiness => new AssignmentBusiness(_context, _mapper);

        public BusinessManager(MensaIntranetContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }
    }
}
