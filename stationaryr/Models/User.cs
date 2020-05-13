﻿
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;
using Stationary.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace stationaryr.Models
{
    public class UserStore : IUserStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>,IUserRoleStore<ApplicationUser>, IQueryableUserStore<ApplicationUser>,IUserEmailStore<ApplicationUser>

    {
        private readonly string _connectionString;

        public   IQueryable<ApplicationUser> Users =>   new Data().GetUsers().AsQueryable();

        public UserStore(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            
            await SaveUsers(user, cancellationToken);
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
          await deleteusers(user, cancellationToken);

            return IdentityResult.Success;
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            ApplicationUser app=  await getuserId(userId, cancellationToken);


            return app;


        }

        public async Task<ApplicationUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var app = await getusername(normalizedUserName, cancellationToken);
            if ( app== null)
            {
                return await Task.FromResult((ApplicationUser)null);
            }
            else
            {
                return app;
            }
           
         


            
            
        }

        public Task<string> GetNormalizedUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedUserName);
        }

        public Task<string> GetUserIdAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
           return Task.FromResult(user.Id.ToString());
        }

        public Task<string> GetUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.UserName);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUser user, string normalizedName, CancellationToken cancellationToken)
        {
            user.NormalizedUserName = normalizedName;
            return Task.FromResult(0);
        }

        public Task SetUserNameAsync(ApplicationUser user, string userName, CancellationToken cancellationToken)
        {
            user.UserName = userName;
            return Task.FromResult(0);
        }

        public async Task<IdentityResult> UpdateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {

            await Updateusers(user, cancellationToken);
            return IdentityResult.Success;
        }

        public async  Task<string> SaveUsers(ApplicationUser Userdgh,CancellationToken cancellationToken)
        {
         
           string ret = "";
            try
            {
                using (OracleConnection con = new OracleConnection(_connectionString))
                {

                    await con.OpenAsync(cancellationToken);
                    OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("P_ID", "");
                    cmd.Parameters.Add("P_USERNAME", Userdgh.UserName);
                    cmd.Parameters.Add("P_EMAILID", Userdgh.Email);
                    cmd.Parameters.Add("P_PHONENO", Userdgh.PhoneNumber);
                    cmd.Parameters.Add("P_DEPTID", Userdgh.Department);
                    cmd.Parameters.Add("P_PASSWORD", Userdgh.PasswordHash);
                    cmd.Parameters.Add("CALLVAL", "0");
                    // cmd.ExecuteNonQuery();
                    DataTable ds = new DataTable();


                    da.Fill(ds);

                    ret = ds.Rows[0][0].ToString();
                   // Userdgh.Id = ds.Rows[0][1].ToString();
                   // userrole(Userdgh);
                    //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                    con.Close();

                }
            }
            catch(Exception ex)
                {
               

            }
            return ret;
        }

     
        public async Task<ApplicationUser> getuserId(string id,CancellationToken cancellationToken)
        {
            
            List<ApplicationUser> ret = new List<ApplicationUser>();
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

                
                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);

                cmd.Parameters.Add("P_USERNAME", "");
                cmd.Parameters.Add("P_EMAILID", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_DEPTID", "");
                cmd.Parameters.Add("P_PASSWORD", "");
                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);
                ret = ds.ToList<ApplicationUser>();
            }
            return ret[0];

        }

        public async Task<ApplicationUser> getuserEmailId(string email, CancellationToken cancellationToken)
        {

            List<ApplicationUser> ret = new List<ApplicationUser>();
            using (OracleConnection con = new OracleConnection(_connectionString))
            {


                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");

                cmd.Parameters.Add("P_USERNAME", "");
                cmd.Parameters.Add("P_EMAILID", email);
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_DEPTID", "");
                cmd.Parameters.Add("P_PASSWORD", "");
                cmd.Parameters.Add("CALLVAL", "7");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<ApplicationUser>();
            }
            return ret[0];

        }
        

        public string userrole(string userid,string roleid)
        {
            string ret = "";
            
                using (OracleConnection con = new OracleConnection(_connectionString))
                {


                    OracleCommand cmd = new OracleCommand("STATIONARY_USER_ROLE_INSERT", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    OracleDataAdapter da = new OracleDataAdapter(cmd);
                    // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                    cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("P_USERID", userid);
                    cmd.Parameters.Add("P_ROLEID",roleid);
                    cmd.Parameters.Add("CALLVAL", "0");
                    // cmd.ExecuteNonQuery();
                    DataTable ds = new DataTable();


                    da.Fill(ds);

                    ret = ds.Rows[0][0].ToString();
             
            }
            return ret;
        }
        public string userroleremove(string userid, string roleid)
        {
            string ret = "";

            using (OracleConnection con = new OracleConnection(_connectionString))
            {


                OracleCommand cmd = new OracleCommand("STATIONARY_USER_ROLE_INSERT", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_USERID", userid);
                cmd.Parameters.Add("P_ROLEID", roleid);
                cmd.Parameters.Add("CALLVAL", "5");
                // cmd.ExecuteNonQuery();
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();

            }
            return ret;
        }
        public async Task<ApplicationUser> getusername(string usename, CancellationToken cancellationToken)
        {
            List<ApplicationUser> ret = new List<ApplicationUser>();
            ApplicationUser ret1 = new ApplicationUser();
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

               
                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", "");

                cmd.Parameters.Add("P_USERNAME", usename);
                cmd.Parameters.Add("P_EMAILID", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_DEPTID", "");
                cmd.Parameters.Add("P_PASSWORD", "");
                cmd.Parameters.Add("CALLVAL", "6");

                DataTable ds = new DataTable();


                da.Fill(ds);

                



                ret = ds.ToList<ApplicationUser>();
                if(ret.Count==0)
                {
                    ret1 = null;
                }
                else
                { ret1 = ret[0]; }
               
            }
            return ret1;

        }
        public async Task<string> deleteusers(ApplicationUser user,CancellationToken cancellationToken)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", user.Id);
                cmd.Parameters.Add("P_USERNAME", "");
                cmd.Parameters.Add("P_EMAILID", "");
                cmd.Parameters.Add("P_PHONENO", "");
                cmd.Parameters.Add("P_DEPTID", "");
                cmd.Parameters.Add("P_PASSWORD", "");
                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }


        public async Task<string> Updateusers(ApplicationUser Userdgh, CancellationToken cancellationToken)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_USERDGH_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", Userdgh.Id);
                cmd.Parameters.Add("P_USERNAME", Userdgh.UserName);
                cmd.Parameters.Add("P_EMAILID", Userdgh.Email);
                cmd.Parameters.Add("P_PHONENO", Userdgh.PhoneNumber);
                cmd.Parameters.Add("P_DEPTID", Userdgh.Department);
                cmd.Parameters.Add("P_PASSWORD", "");

                cmd.Parameters.Add("CALLVAL", "4");
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
                //  cmd.ExecuteNonQuery();

                //  ret[0].App_status = ds.Tables[1].ToList<ApplicationStatus>();
                con.Close();

            }
            return ret;
        }
    
        public Task<string> GetPasswordHashAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.PasswordHash);
        }

        public Task<bool> HasPasswordAsync(ApplicationUser user, CancellationToken cancellationToken)
        {

            return Task.FromResult(user.PasswordHash != null);
        }

        public Task SetPasswordHashAsync(ApplicationUser user, string passwordHash, CancellationToken cancellationToken)
        {
            user.PasswordHash = passwordHash;
            return Task.FromResult(0);
        }

        public  Task AddToRoleAsync(ApplicationUser user, string roleName, CancellationToken cancellationToken)
        {
            return  Task.Run(() => userrole(user.Id, roleName));
        }

        public async Task<IList<string>> GetRolesAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return await Task.Run(() => new Data().Getrolebyuser(user.Id));
        }

        public Task<IList<ApplicationUser>> GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<bool> IsInRoleAsync(ApplicationUser user, string roleName, CancellationToken cancellationToken)
        {
            return Task.Run(() => new Data().checkroleuser(user.Id, roleName));
        }

        public Task RemoveFromRoleAsync(ApplicationUser user, string roleName, CancellationToken cancellationToken)
        {
            return Task.Run(() => userroleremove(user.Id, roleName));
        }

        public async Task<ApplicationUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            ApplicationUser app = await getuserEmailId(normalizedEmail, cancellationToken);


            return app;
        }

        public Task<string> GetEmailAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.Email.ToString());
        }

        public Task<bool> GetEmailConfirmedAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNormalizedEmailAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult(user.NormalizedEmail.ToString());
        }

        public Task SetEmailAsync(ApplicationUser user, string email, CancellationToken cancellationToken)
        {
            user.Email = email;
            return Task.FromResult(0);
        }

        public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedEmailAsync(ApplicationUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            user.NormalizedEmail = normalizedEmail;
            return Task.FromResult(0);
        }

        public Task<ClaimsPrincipal> CreateAsync(ApplicationUser user)
        {
            throw new NotImplementedException();
        }

        public Task AddClaimsAsync(ApplicationUser user, IEnumerable<Claim> claims, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IList<Claim>> GetClaimsAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IList<ApplicationUser>> GetUsersForClaimAsync(Claim claim, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task RemoveClaimsAsync(ApplicationUser user, IEnumerable<Claim> claims, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task ReplaceClaimAsync(ApplicationUser user, Claim claim, Claim newClaim, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
