const PROCESSING_CHARGE = 10;
function calculateFineBill() {
    const lateDays = Number(document.getElementById("lateDays").value);
    const bookCount = Number(document.getElementById("bookCount").value);
    const memberType = document.getElementById("memberType").value;
    const resultElement = document.getElementById("result");
    const breakdownElement = document.getElementById("breakdown");

     // Validate inputs
    if (
        !Number.isInteger(lateDays) ||
        !Number.isInteger(bookCount) ||
        lateDays < 0 ||
        lateDays > 10 ||
        bookCount < 1 ||
        bookCount > 5
    ) {
        resultElement.textContent =
            "Please enter 0–10 late days and 1–5 books.";
        breakdownElement.textContent = "Invalid input.";
        return;
    }


    const rate = chooseRate(memberType);
    const basicFine = calculateFine(lateDays, bookCount, rate);
    const processingCharge =
     basicFine > 0 ? PROCESSING_CHARGE : 0;
    const total = calculateTotal(basicFine, processingCharge);
    resultElement.textContent =
        "Rate: ₹" + rate +
        " per day per book | Basic fine: ₹" + basicFine +
        " | Processing charge: ₹" + processingCharge +
        " | Total: ₹" + total;

    breakdownElement.textContent =
        buildBreakdown(lateDays, bookCount, rate);
}

function calculateFine(days, books, rate) {
    // TODO M6: Calculate fine from days, number of books and rate.
    return days * books * rate;
}

function chooseRate(type) {
    // TODO D1: Use if / else if / else: Student=5, Staff=3, Visitor=10.
     if (type === "Student") {
        return 5;
    } else if (type === "Staff") {
        return 3;
    } else if (type === "Visitor") {
        return 10;
    } else {
        return 0;
    }
}

function calculateTotal(fine, processingCharge) {
    // TODO D2: Return 0 for no fine; otherwise add the processing charge.
     if (fine <= 0) {
        return 0;
    } else {
        return fine + processingCharge;
    }
}

function buildBreakdown(days, books, rate) {
    // TODO D3: Use for loop from day 1 to days. Show cumulative fine at each day.
    let summary = "Cumulative Fine by Day\n";
    summary += "----------------------\n";

    if (days === 0) {
        return summary + "No fine is payable.\n";
    }

    for (let day = 1; day <= days; day++) {
        const cumulativeFine = day * books * rate;

        summary +=
            "Day " + day + ": ₹" + cumulativeFine + "\n";
    }

    return summary;
}
