function chose_vote(module_id, post_id, response_id, choice) {
    let choices = { '-1': 'downvote', 1: 'upvote' };

    let previous_choice = document.getElementById('reply' + response_id).querySelector('.vote-answer');
    let vote = previous_choice.querySelector('.vote-number');

    if (previous_choice.getAttribute('user_choice') === String(choice)) {
        previous_choice.setAttribute('user_choice', false);
        vote.innerText = Number(vote.innerText) + choice * -1;
    }

    else if (previous_choice.getAttribute('user_choice') === 'false') {
        previous_choice.setAttribute('user_choice', choice);
        vote.innerText = Number(vote.innerText) + choice;
    }

    else {
        previous_choice.setAttribute('user_choice', choice);
        vote.innerText = Number(vote.innerText) + choice * 2;
    }

    if (previous_choice.getAttribute('user_choice') === 'false') {
        previous_choice.querySelector('.' + choices[1]).classList.remove("selected_vote");
        previous_choice.querySelector('.' + choices[-1]).classList.remove("selected_vote");
    }
    else {
        previous_choice.querySelector('.' + choices[Number(previous_choice.getAttribute('user_choice')) * -1]).classList.remove("selected_vote");
        previous_choice.querySelector('.' + choices[Number(previous_choice.getAttribute('user_choice'))]).classList.add("selected_vote");
    }

    $.post('/reply_vote/reply_vote', { module_id: module_id, choice: choice, post_id: post_id, reply_id: response_id }, (data) => true);

    /*
    let f = document.createElement("form");
    f.setAttribute('name', 'f');
    f.setAttribute('id', 'f');
    f.setAttribute('method', "post");
    f.setAttribute('action', "reply_vote/reply_vote");

    let choice = document.createElement("input");
    choice.setAttribute('type', "hidden");
    choice.setAttribute('name', "choice");
    choice.setAttribute('value', user_choice);
    f.appendChild(choice);

    let module = document.createElement("input");
    module.setAttribute('type', "hidden");
    module.setAttribute('name', "module_id");
    module.setAttribute('value', module_id);
    f.appendChild(module);

    let post = document.createElement("input");
    post.setAttribute('type', "hidden");
    post.setAttribute('name', "post_id");
    post.setAttribute('value', post_id);
    f.appendChild(post);

    let response = document.createElement("input");
    response.setAttribute('type', "hidden");
    response.setAttribute('name', "reply_id");
    response.setAttribute('value', response_id);
    f.appendChild(response);

    let s = document.createElement("button");
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Submit");
    s.hidden = true;
    f.appendChild(s);
    document.body.append(f);
    f.submit();
    */
}

function show_vote_all() {
    let votes = document.querySelectorAll(".vote-answer");
    let choices = { '-1': 'downvote', 1: 'upvote' };

    for (const vote of votes) {
        let choice = vote.getAttribute('user_choice');

        if (choice !== "false") {
            vote.querySelector('.' + choices[Number(choice) * -1]).classList.remove("selected_vote");
            vote.querySelector('.' + choices[Number(choice)]).classList.add("selected_vote");
        }
    }
}
show_vote_all();
