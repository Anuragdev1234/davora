import type { ProgramCategory } from './types';

export const category12RealWorld: ProgramCategory = {
  id: 'cat-real-world',
  index: 12,
  title: 'Real-World Scenario Programs',
  slug: 'real-world',
  description: 'Apply C programming to practical calculations and familiar scenarios.',
  difficulty: 'Advanced',
  filterTag: 'Real-World',
  programs: [
    {
      id: 'rw-1',
      slug: 'leap-year-calculation',
      indexInCategory: 1,
      title: 'Leap Year Calculation',
      categorySlug: 'real-world',
      categoryTitle: 'Real-World Scenario Programs',
      difficulty: 'Advanced',
      description: 'Comprehensive business logic for calendar date validation and February day length calculations.',
      code: `#include <stdio.h>

int isLeapYear(int year) {
    return ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
}

int getDaysInMonth(int month, int year) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2:
            return isLeapYear(year) ? 29 : 28;
        default:
            return -1; // Invalid
    }
}

int main(void) {
    int year = 2028;
    int month = 2;

    printf("Date Verification Suite:\\n");
    printf("Year: %d -> %s\\n", year, isLeapYear(year) ? "Leap Year" : "Standard Year");
    printf("Days in Month %d/%d: %d days\\n", month, year, getDaysInMonth(month, year));

    return 0;
}`,
      output: `Date Verification Suite:
Year: 2028 -> Leap Year
Days in Month 2/2028: 29 days`,
      explanation: {
        concept: 'Encapsulates calendar domain rules into reusable modules for date libraries and enterprise booking systems.',
        algorithm: [
          'Modularize leap year predicate.',
          'Delegate February day resolution to leap year query.',
          'Return exact calendar days.',
        ],
        keyConstructs: ['Domain logic modularity', 'Compound boolean predicate', 'Calendar validation'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Calendar', 'Real World', 'Dates'],
    },
    {
      id: 'rw-2',
      slug: 'student-marks-grading-system',
      indexInCategory: 2,
      title: 'Student Marks & Grading System',
      categorySlug: 'real-world',
      categoryTitle: 'Real-World Scenario Programs',
      difficulty: 'Advanced',
      description: 'Tabulate multi-subject exam scores, calculate average percentage, assign honors grades, and output academic transcript.',
      code: `#include <stdio.h>

struct Student {
    char name[30];
    int marks[5];
    float total;
    float average;
    char grade;
};

char computeGrade(float avg) {
    if (avg >= 90.0f) return 'A';
    if (avg >= 80.0f) return 'B';
    if (avg >= 70.0f) return 'C';
    if (avg >= 60.0f) return 'D';
    return 'F';
}

int main(void) {
    struct Student s = {"Elena Rostova", {92, 88, 95, 84, 91}, 0, 0, ' '};
    const char *subjects[5] = {"C Programming", "Data Structures", "Algorithms", "Computer Systems", "Mathematics"};

    for (int i = 0; i < 5; i++) {
        s.total += s.marks[i];
    }
    s.average = s.total / 5.0f;
    s.grade = computeGrade(s.average);

    printf("========================================\\n");
    printf("       ACADEMIC TRANSCRIPT REPORT       \\n");
    printf("========================================\\n");
    printf("Student: %s\\n", s.name);
    printf("----------------------------------------\\n");
    for (int i = 0; i < 5; i++) {
        printf("%-18s: %3d / 100\\n", subjects[i], s.marks[i]);
    }
    printf("----------------------------------------\\n");
    printf("Total Marks:        %5.1f / 500\\n", s.total);
    printf("Average Percentage: %5.2f%%\\n", s.average);
    printf("Final Grade:        [%c]\\n", s.grade);
    printf("Status:             %s\\n", (s.grade != 'F') ? "PASSED WITH DISTINCTION" : "FAILED");
    printf("========================================\\n");

    return 0;
}`,
      output: `========================================
       ACADEMIC TRANSCRIPT REPORT       
========================================
Student: Elena Rostova
----------------------------------------
C Programming     :  92 / 100
Data Structures   :  88 / 100
Algorithms        :  95 / 100
Computer Systems  :  84 / 100
Mathematics       :  91 / 100
----------------------------------------
Total Marks:        450.0 / 500
Average Percentage: 90.00%
Final Grade:        [A]
Status:             PASSED WITH DISTINCTION
========================================`,
      explanation: {
        concept: 'Demonstrates C struct data aggregation modeling real-world entities with structured reporting.',
        algorithm: [
          'Aggregate student attributes in struct Student.',
          'Loop across marks array to accumulate total and compute average.',
          'Evaluate letter grade.',
          'Print clean ASCII transcript table.',
        ],
        keyConstructs: ['struct declaration', 'Array of scores inside struct', 'Formatted academic reporting'],
        complexity: 'Time: O(subjects), Space: O(1)',
      },
      tags: ['Structs', 'Grading', 'Real World', 'Reports'],
    },
    {
      id: 'rw-3',
      slug: 'electricity-bill-generator',
      indexInCategory: 3,
      title: 'Electricity Bill Generator',
      categorySlug: 'real-world',
      categoryTitle: 'Real-World Scenario Programs',
      difficulty: 'Advanced',
      description: 'Calculate tiered utility bills based on progressive consumption slabs with surcharge taxes.',
      code: `#include <stdio.h>

double computeElectricityBill(int units) {
    double bill = 0.0;

    // Progressive slab rates:
    // First 100 units: $1.20 per unit
    // Next 200 units (101-300): $2.00 per unit
    // Above 300 units: $3.00 per unit
    if (units <= 100) {
        bill = units * 1.20;
    } else if (units <= 300) {
        bill = (100 * 1.20) + ((units - 100) * 2.00);
    } else {
        bill = (100 * 1.20) + (200 * 2.00) + ((units - 300) * 3.00);
    }

    // Add 10% environmental infrastructure surcharge
    bill += bill * 0.10;
    return bill;
}

int main(void) {
    int consumptionUnits = 340;
    double finalBill = computeElectricityBill(consumptionUnits);

    printf("UTILITY BILLING INVOICE\\n");
    printf("----------------------------------------\\n");
    printf("Consumption:     %d kWh\\n", consumptionUnits);
    printf("Slab Tier:       Tier 3 (> 300 kWh)\\n");
    printf("Total Due (tax): $%.2f\\n", finalBill);

    return 0;
}`,
      output: `UTILITY BILLING INVOICE
----------------------------------------
Consumption:     340 kWh
Slab Tier:       Tier 3 (> 300 kWh)
Total Due (tax): $704.00`,
      explanation: {
        concept: 'Progressive slab billing models real-world utility economics where consumption is tiered into brackets.',
        algorithm: [
          'Calculate rate for units within first 100 bracket.',
          'Calculate rate for units within 101-300 bracket.',
          'Calculate remaining units at top bracket rate.',
          'Apply 10% surcharge.',
        ],
        keyConstructs: ['Progressive tiered calculation', 'Multi-bracket arithmetic', 'Invoice formatting'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Billing', 'Utility', 'Real World', 'Finance'],
    },
    {
      id: 'rw-4',
      slug: 'car-rental-cost-calculator',
      indexInCategory: 4,
      title: 'Car Rental Cost Calculator',
      categorySlug: 'real-world',
      categoryTitle: 'Real-World Scenario Programs',
      difficulty: 'Advanced',
      description: 'Calculate vehicle rental fees based on vehicle class, days, distance, and insurance options.',
      code: `#include <stdio.h>

double calculateRentalCost(char carType, int days, int kilometers, int insurance) {
    double dailyRate = 0.0;
    double kmRate = 0.0;

    switch (carType) {
        case 'E': case 'e': // Economy
            dailyRate = 45.0;
            kmRate = 0.25;
            break;
        case 'S': case 's': // Sedan
            dailyRate = 75.0;
            kmRate = 0.40;
            break;
        case 'L': case 'l': // Luxury / SUV
            dailyRate = 140.0;
            kmRate = 0.70;
            break;
        default:
            return -1.0;
    }

    double baseCost = (dailyRate * days) + (kmRate * kilometers);
    if (insurance) {
        baseCost += 18.0 * days; // $18/day insurance
    }

    return baseCost;
}

int main(void) {
    char type = 'S';
    int days = 5;
    int km = 420;
    int insurance = 1;

    double total = calculateRentalCost(type, days, km, insurance);

    printf("Car Rental Quote:\\n");
    printf("Class: Sedan | Days: %d | Km: %d | Insurance: %s\\n", 
           days, km, insurance ? "YES" : "NO");
    printf("Total Estimated Cost: $%.2f\\n", total);

    return 0;
}`,
      output: `Car Rental Quote:
Class: Sedan | Days: 5 | Km: 420 | Insurance: YES
Total Estimated Cost: $633.00`,
      explanation: {
        concept: 'Multi-parameter commercial calculation factoring base daily rates, mileage consumption, and optional insurance riders.',
        algorithm: [
          'Identify vehicle class rates via switch.',
          'Multiply daily rate by days.',
          'Multiply mileage rate by kilometers.',
          'Add insurance fee if selected.',
        ],
        keyConstructs: ['Multi-parameter pricing function', 'Switch case configuration', 'Conditional fee addition'],
        complexity: 'Time: O(1), Space: O(1)',
      },
      tags: ['Rental', 'Pricing', 'Real World', 'Commercial'],
    },
  ],
};
