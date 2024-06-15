document.getElementById('votingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const regNumber = document.getElementById('regNumber').value;
    const chairperson = document.querySelector('input[name="chairperson"]:checked').value;
    const viceChairperson = document.querySelector('input[name="viceChairperson"]:checked').value;
    const cashier = document.querySelector('input[name="cashier"]:checked').value;
    const katibu = document.querySelector('input[name="katibu"]:checked').value;
    const secretary = document.querySelector('input[name="secretary"]:checked').value;

    const userKey = `${regNumber}-voted`;

    if (localStorage.getItem(userKey)) {
        document.getElementById('message').textContent = 'You have already voted!';
        return;
    }

    localStorage.setItem(userKey, true);

    const votes = JSON.parse(localStorage.getItem('votes')) || {
        chairperson: {},
        viceChairperson: {},
        cashier: {},
        katibu: {},
        secretary: {}
    };

    votes.chairperson[chairperson] = (votes.chairperson[chairperson] || 0) + 1;
    votes.viceChairperson[viceChairperson] = (votes.viceChairperson[viceChairperson] || 0) + 1;
    votes.cashier[cashier] = (votes.cashier[cashier] || 0) + 1;
    votes.katibu[katibu] = (votes.katibu[katibu] || 0) + 1;
    votes.secretary[secretary] = (votes.secretary[secretary] || 0) + 1;

    localStorage.setItem('votes', JSON.stringify(votes));

    // Prepare the vote summary to send via email
    const voteSummary = `
        Name: ${name}
        Registration Number: ${regNumber}
        
        Votes:
        Chairperson: ${chairperson}
        Vice Chairperson: ${viceChairperson}
        Cashier: ${cashier}
        Katibu: ${katibu}
        Secretary: ${secretary}
