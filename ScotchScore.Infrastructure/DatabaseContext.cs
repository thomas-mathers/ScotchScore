using Microsoft.EntityFrameworkCore;
using ScotchScore.Domain;

namespace ScotchScore.Infrastructure;

public class DatabaseContext : DbContext
{
    public DbSet<Scotch> Scotches => Set<Scotch>();
    public DbSet<Review> Reviews => Set<Review>();
    
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Scotch>().ToContainer("Scotches");
        modelBuilder.Entity<Scotch>().HasKey(x => x.Id);
        modelBuilder.Entity<Review>().ToContainer("Reviews");
        modelBuilder.Entity<Review>().HasKey(x => x.Id);
    }
}