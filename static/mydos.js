var BASE_URL = "http://127.0.0.1:8000/api/v1";
//var BASE_URL = "http://vishvendra01.pythonanywhere.com/api/v1";

$(document).ready(function(){
    var csrftoken = $.cookie('csrftoken');

    $("#add_button").click(addTodoBtnClick);
    $("#todo_list_ui").hide();
    fetchTodoGroups()

    $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
});

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


function fetchTodoGroups(){
    $.ajax({
        url: `${BASE_URL}/todo_groups/?format=json`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            console.log(data);
            showTodoGroups(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            alert(textStatus);
        }
    });
}

function showTodoGroups(todoGroupsList){
    var i = 0;
    for(i; i<todoGroupsList.length; i++){
        var todoGroup = todoGroupsList[i];
        var id = todoGroup.id;
        var groupTitle = todoGroup.title;
        var childHtml = `<span class="mdl-navigation__link" id="${id}" >${groupTitle}</span>`
        $(".mdl-navigation").append(childHtml);
        $("#" + id).click(todoGroupClick)
    }
}

function todoGroupClick(){
    $("#todo_list_ui").show();

    var groupId = $(this).attr('id');
    var groupTitle = $(this).text();
    $("#todo_title").text(groupTitle);

    fetchTodos(groupId);
}

function fetchTodos(groupId){
    $.ajax({
        url: `${BASE_URL}/todos/?format=json&group=${groupId}`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            console.log(data);
            showTodos(groupId, data, true);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            alert(textStatus);
        }
    });
}

function showTodos(groupId, todoList, clearCurrentList){
    if(clearCurrentList){
        $("#todo_list").empty();
    }

    var i = 0;
    for(i; i<todoList.length; i++){
        var todo = todoList[i];
        var id = todo.id;
        var title = todo.title;
        var done = todo.done;
        var todoHtmlRow = getTodoRowHtml(id, title, done);
        $("#todo_list").append(todoHtmlRow);
    }

    $(".done-button").click(doneButtonClick);
    $(".delete-button").click(deleteButtonClick);

    $("#add_button").attr('data-id', groupId);
}

function doneButtonClick(){
    var todoId = $(this).attr("data-id");
    var groupId = $("#add_button").attr("data-id");

    var todoRow = $(`span[data-id='${todoId}']`)
    if(todoRow != null){
        var todoMessage = $(todoRow).text();
        var done = $(todoRow).hasClass("linethrough");
        changeTodoStatus(todoId, groupId, todoMessage, !done);
    }
}

function deleteButtonClick(){
    var todoId = $(this).attr("data-id");
    var groupId = $("#add_button").attr("data-id");

    deleteTodo(todoId, groupId);
}

function changeTodoStatus(todoId, groupdId, title, status){
    var todo = {
        'title' : title,
        'group' : groupdId,
        'done' : status
    };

    $.ajax({
        url: `${BASE_URL}/todos/${todoId}/?format=json`,
        type: "PUT",
        data: JSON.stringify(todo),
        contentType: "application/json",
        success: function (data) {
            fetchTodos(groupdId);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            alert(textStatus);
        }
    });
}

function deleteTodo(todoId, groupId){
    $.ajax({
        url: `${BASE_URL}/todos/${todoId}/?format=json`,
        type: "DELETE",
        contentType: "application/json",
        success: function (data) {
            fetchTodos(groupId);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            alert(textStatus);
        }
    });
}

function getTodoRowHtml(id, message, done){
	var strikeThroughClass = "linethrough";
	if(!done){
		strikeThroughClass = "";
	}

	return `<li>
              <div class="todo-item-container">
                <span class="todo-message ${strikeThroughClass}" data-id="${id}">${message}</span>
                <!--<img style="float:right;" src="ic_delete.svg" alt="delete icon" />-->
                <div class="todo-ops-container">
                  <i class="material-icons todo-ops-button done-button" id="done-btn" data-id="${id}" style="cursor:pointer">done</i>
                  <i class="material-icons todo-ops-button delete-button" id="delete-btn" data-id="${id}"  style="cursor:pointer">delete</i>
                </div>
              </div>
            </li>`
}

function addTodoBtnClick(){
    var input = $("#input_todo_message").val();
	if(input !== ""){
		$("#input_todo_message").val("");
        var groupId = $("#add_button").attr("data-id");
        console.log(groupId);
        if(groupId != undefined){
            addTodo(groupId, input);
        }

	}
}

function addTodo(groupId, title){
    var todo = {
        'title' : title,
        'group' : groupId,
        'done' : false
    };

    $.ajax({
        url: `${BASE_URL}/todos/?format=json`,
        type: "POST",
        data: JSON.stringify(todo),
        contentType: "application/json",
        success: function (data) {
            showTodos(groupId, [data], false);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
            alert(textStatus);
        }
    }); 
}

