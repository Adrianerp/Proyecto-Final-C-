using Microsoft.Data.SqlClient;

namespace apiVideojuegos.Helpers
{
    public interface IDatabaseExecutor
    {
        Task<T> ExecuteCommand<T>(Func<SqlConnection, Task<T>> task);
    }
}
