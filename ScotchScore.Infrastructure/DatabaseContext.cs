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
        modelBuilder.Entity<Scotch>().HasNoDiscriminator();
        modelBuilder.Entity<Scotch>().HasKey(x => x.Id);
        modelBuilder.Entity<Scotch>().HasPartitionKey(x => x.Id);
        modelBuilder.Entity<Scotch>().Property(x => x.Id).ToJsonProperty("id");
        modelBuilder.Entity<Scotch>().Property(x => x.Region).HasConversion<string>();
        modelBuilder.Entity<Scotch>().Property(x => x.Currency).HasConversion<string>();
        
        modelBuilder.Entity<Review>().ToContainer("Reviews");
        modelBuilder.Entity<Review>().HasNoDiscriminator();
        modelBuilder.Entity<Review>().HasKey(x => x.Id);
        modelBuilder.Entity<Review>().HasPartitionKey(x => x.ScotchId);
        modelBuilder.Entity<Review>().Property(x => x.Id).ToJsonProperty("id");
    }
}