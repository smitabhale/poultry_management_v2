from django.db import models

class Flock(models.Model):
    batch_number = models.CharField(max_length=20, unique=True)
    date = models.DateField()
    opening_female = models.IntegerField()
    opening_male = models.IntegerField()
    rate = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.batch_number

class Batch(models.Model):
    batch_number = models.OneToOneField(Flock, on_delete=models.CASCADE, primary_key=True)
    start_date = models.DateField()  # same as Flock.date
    current_stage = models.CharField(max_length=20, default="Chick")
    current_shed = models.CharField(max_length=50, default="Chick Shed")

    def __str__(self):
        return self.batch_number.batch_number

class DailyEntry(models.Model):
    date = models.DateField()
    batch_number = models.ForeignKey(Flock, on_delete=models.CASCADE)
    
    age = models.IntegerField()
    stage = models.CharField(max_length=20)
    shed = models.CharField(max_length=50)

    # Row 2 - Female
    opening_female = models.IntegerField()
    female_mortality = models.IntegerField()
    closing_female = models.IntegerField()
    cumulative_female_mortality = models.IntegerField()
    cumulative_female_mortality_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    # Row 3 - Male
    opening_male = models.IntegerField()
    male_mortality = models.IntegerField()
    closing_male = models.IntegerField()
    cumulative_male_mortality = models.IntegerField()
    cumulative_male_mortality_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    # Row 4 - Egg data
    hatching_eggs = models.IntegerField()
    pullet_eggs = models.IntegerField()
    commercial_eggs = models.IntegerField()
    crack_eggs = models.IntegerField()
    waste_eggs = models.IntegerField()
    total_eggs = models.IntegerField()
    total_eggs_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    hatching_egg_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    # Row 5 - Female feed
    opening_female_feed_stock = models.DecimalField(max_digits=8, decimal_places=2)
    female_feed_consumption = models.DecimalField(max_digits=8, decimal_places=2)
    female_stock_in = models.DecimalField(max_digits=8, decimal_places=2)
    closing_female_feed = models.DecimalField(max_digits=8, decimal_places=2)

    # Row 6 - Male feed
    opening_male_feed_stock = models.DecimalField(max_digits=8, decimal_places=2)
    male_feed_consumption = models.DecimalField(max_digits=8, decimal_places=2)
    male_stock_in = models.DecimalField(max_digits=8, decimal_places=2)
    closing_male_feed = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.batch_number.batch_number} - {self.date}"


