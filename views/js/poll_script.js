function markAnswer(module_id, post_id, choice) {
    let poll = document.getElementById('poll' + post_id);
    let previous_choice = poll.querySelector('.answers').getAttribute('user_choice');
    let all_votes = Number(poll.querySelector('.answers').getAttribute('all_votes'));
    let choice_count = poll.querySelector('.answers').querySelector(`[choice="${choice}"]`);

    if (previous_choice === 'false') {
        poll.querySelector('.answers').setAttribute('user_choice', choice);
        poll.querySelector('.answers').setAttribute('all_votes', all_votes + 1);
        choice_count.setAttribute('votes', Number(choice_count.getAttribute('votes')) + 1);
    }

    else if (previous_choice === String(choice)) {
        poll.querySelector('.answers').setAttribute('user_choice', false);
        poll.querySelector('.answers').setAttribute('all_votes', all_votes - 1);
        choice_count.setAttribute('votes', Number(choice_count.getAttribute('votes')) - 1);
    }

    else {
        let old_choice = poll.querySelector('.answers').querySelector(`[choice="${previous_choice}"]`);
        poll.querySelector('.answers').setAttribute('user_choice', choice);
        choice_count.setAttribute('votes', Number(choice_count.getAttribute('votes')) + 1);
        old_choice.setAttribute('votes', Number(choice_count.getAttribute('votes')) - 1);
    }

    showResults(post_id);

    $.post('/vote/vote', { module_id: module_id, choice: choice, post_id: post_id }, (data) => true);

    /*
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

        let module_id = document.createElement("input");
        module_id.setAttribute('type', "hidden");
        module_id.setAttribute('name', "module_id");
        module_id.setAttribute('value', module);
        f.appendChild(module_id);

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
        */
}

function showResults(post_id) {
    let poll = document.getElementById('poll' + post_id);
    let user_choice = poll.querySelector('.answers').getAttribute('user_choice');

    let answers = poll.querySelectorAll(`.poll .answers .answer`);

    for (const choice of answers)
        choice.classList.remove("selected");

    if (user_choice !== 'false')
        answers[Number(user_choice)].classList.add("selected");


    let percentage = 0;
    let pollCount = Number(poll.querySelector('.answers').getAttribute('all_votes'));


    for (let i = 0; i < answers.length; i++) {
        percentage = pollCount === 0 ? 0 : Math.round(Number(answers[i].getAttribute('votes')) * 100 / pollCount);
        answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
        answers[i].querySelector(".percentage-value").innerText = percentage + "%";
    }
}
