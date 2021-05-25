function markAnswer(i, poll, user_choice) {
    if (user_choice !== false)
        return;
    user_choice = +i;
    try {
        document.getElementById(`poll${poll.id}`).querySelector(`.poll .answers .answer.selected`).classList.remove("selected");
    } catch (msg) { }
    document.getElementById(`poll${poll.id}`).querySelectorAll(`.poll .answers .answer`)[+i].classList.add("selected");

    let f = document.createElement("form");
    f.setAttribute('name', 'f');
    f.setAttribute('id', 'f');
    f.setAttribute('method', "post");
    f.setAttribute('action', "vote/vote");
    let choice = document.createElement("input");
    choice.setAttribute('type', "hidden");
    choice.setAttribute('name', "choice");
    choice.setAttribute('value', user_choice);
    f.appendChild(choice);

    let post_id = document.createElement("input");
    post_id.setAttribute('type', "hidden");
    post_id.setAttribute('name', "post_id");
    post_id.setAttribute('value', poll.id);
    f.appendChild(post_id);

    let s = document.createElement("button");
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Submit");
    s.hidden = true;
    f.appendChild(s);
    document.body.append(f);
    f.submit();
}

function showResults(poll, user_choice) {
    if (user_choice !== false) {
        if (!document.getElementById(`poll${poll.id}`).querySelector(`.poll .answers .answer.selected`))
            document.getElementById(`poll${poll.id}`).querySelectorAll(`.poll .answers .answer`)[user_choice].classList.add("selected");

    }
    let answers = document.getElementById(`poll${poll.id}`).querySelectorAll(`.poll .answers .answer`);

    let percentage = 0;
    let pollCount = poll.pollCount > 0 ? poll.pollCount : 1;

    for (let i = 0; i < answers.length; i++) {
        percentage = Math.round(poll.votes[i] * 100 / pollCount);
        answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
        answers[i].querySelector(".percentage-value").innerText = percentage + "%";
    }
}
