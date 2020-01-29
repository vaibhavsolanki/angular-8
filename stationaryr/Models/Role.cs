using AutoMapper;
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
    public class RoleStore: IQueryableRoleStore<ApplicationRole>,IRoleStore<ApplicationRole>,IRoleClaimStore<ApplicationRole>
    {
        private readonly string _connectionString;

        public IQueryable<ApplicationRole> Roles => new Data().GetRoles().AsQueryable();

        public RoleStore(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<IdentityResult> CreateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            await Saverole(role, cancellationToken);
            return IdentityResult.Success;
            //throw new NotImplementedException();
        }

        public async Task<IdentityResult> DeleteAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            await deleterole(role, cancellationToken);

            return IdentityResult.Success;
        }

        public async Task<ApplicationRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            ApplicationRole app = await getRoleId(roleId, cancellationToken);


            return app;
        }

        public async Task<ApplicationRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            var app = await getuserrole(normalizedRoleName, cancellationToken);
            if (app == null)
            {
                return await Task.FromResult((ApplicationRole)null);
            }
            else
            {
                return app;
            }
        }

        public Task<string> GetNormalizedRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {

            return Task.FromResult(role.NormalizedName);
        }

            public Task<string> GetRoleIdAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Id.ToString());
        }

        public Task<string> GetRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Name);
        }

        public Task SetNormalizedRoleNameAsync(ApplicationRole role, string normalizedName, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.NormalizedName);
           
        }

        public Task SetRoleNameAsync(ApplicationRole role, string roleName, CancellationToken cancellationToken)
        {
            role.Name = roleName;
            return Task.FromResult(0);

        }

        public async Task<IdentityResult> UpdateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            await Updaterole(role, cancellationToken);
            return IdentityResult.Success;
        }

        public void Dispose()
        {
           // throw new NotImplementedException();
        }
        public async  Task<string> Saverole(ApplicationRole Role, CancellationToken cancellationToken)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;
                OracleDataAdapter da = new OracleDataAdapter(cmd);
                // OracleParameter op = new OracleParameter("data_cursor", OracleDbType.RefCursor) { Direction = ParameterDirection.Output };
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID","");
                cmd.Parameters.Add("P_NAME", Role.Name);
                cmd.Parameters.Add("P_DESCRIPTION", Role.Description);
                cmd.Parameters.Add("CALLVAL", "0");
                // cmd.ExecuteNonQuery();
                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
             
                con.Close();

            }
            return ret;
        }
        public async Task<string> Updaterole(ApplicationRole Role, CancellationToken cancellationToken)
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
                cmd.Parameters.Add("P_ID", "");
                cmd.Parameters.Add("P_NAME", Role.Name);
                cmd.Parameters.Add("P_DESCRIPTION", Role.Description);

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

        public async Task<string> deleterole(ApplicationRole role, CancellationToken cancellationToken)
        {
            string ret = "";
            using (OracleConnection con = new OracleConnection(_connectionString))
            {
                await con.OpenAsync(cancellationToken);
              
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;

                cmd.Parameters.Add("P_ID", role.Id);
                cmd.Parameters.Add("P_NAME","");
                cmd.Parameters.Add("P_DESCRIPTION","");


                cmd.Parameters.Add("CALLVAL", "3");

                DataTable ds = new DataTable();


                da.Fill(ds);

                ret = ds.Rows[0][0].ToString();
            }
            return ret;

        }

        //public  List<RoleViewModel> GetRoles()
        //{
        //    List<RoleViewModel> ret = new List<RoleViewModel>();
        //    using (OracleConnection con = new OracleConnection(_connectionString))
        //    {

        //        con.Open();
        //        OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
        //        cmd.CommandType = CommandType.StoredProcedure;

        //        OracleDataAdapter da = new OracleDataAdapter(cmd);
        //        cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
        //        cmd.Parameters.Add("P_ID","");
        //        cmd.Parameters.Add("P_NAME", "");
        //        cmd.Parameters.Add("P_DESCRIPTION", "");


        //        cmd.Parameters.Add("CALLVAL", "1");

        //        DataTable ds = new DataTable();


        //        da.Fill(ds);

        //        ret = ds.ToList<RoleViewModel>();
        //    }
        //    return ret;
        //}


        public async Task<ApplicationRole> getRoleId(string id, CancellationToken cancellationToken)
        {
            List<ApplicationRole> ret = new List<ApplicationRole>();
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);


                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");


                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<ApplicationRole>();
            }
          return ret[0]; 

        }
        public async Task<ApplicationRole> getuserrole(string id, CancellationToken cancellationToken)
        {
            List<ApplicationRole> ret = new List<ApplicationRole>();
            ApplicationRole ret1 = new ApplicationRole();
            using (OracleConnection con = new OracleConnection(_connectionString))
            {

                await con.OpenAsync(cancellationToken);
                OracleCommand cmd = new OracleCommand("STATIONARY_ROLE_CRUD", con);
                cmd.CommandType = CommandType.StoredProcedure;

                OracleDataAdapter da = new OracleDataAdapter(cmd);
                cmd.Parameters.Add("data_cursor", OracleDbType.RefCursor).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("P_ID", id);


                cmd.Parameters.Add("P_NAME", "");
                cmd.Parameters.Add("P_DESCRIPTION", "");


                cmd.Parameters.Add("CALLVAL", "2");

                DataTable ds = new DataTable();


                da.Fill(ds);





                ret = ds.ToList<ApplicationRole>();
                if (ret.Count == 0)
                {
                    ret1 = null;
                }
                else
                { ret1 = ret[0]; }
            }
            return ret1;
        }

        public Task AddClaimAsync(ApplicationRole role, Claim claim, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<IList<Claim>> GetClaimsAsync(ApplicationRole role, CancellationToken cancellationToken = default)
        {
            List<Claim> cl = new List<Claim>();

            var claim = new Data().getclaimbyrole(role.Id);
            

            // getclaim();
            return await Task.Run(() => cl);
        }

        public Task RemoveClaimAsync(ApplicationRole role, Claim claim, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
