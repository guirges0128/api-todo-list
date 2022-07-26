$(document).ready(function() {
    var getAllTasks = function() {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=493',
            dataType: 'json',
            //comunicate with api after succesful connection
            success: function(response, textStatus) {
                //empty deleted task items
                $('#api-todo').empty();
                //loop through and append task items into DOM
                response.tasks.forEach(function(task) {
                    $('#api-todo').append('<div class="row" id="task-row"><div class="col-12 id="mini-row""><p class="tasks d-inline-block">' + task.content + '</p><button class="btn delete d-inline-block" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
                })

            },
            //display eeror message on console if connection is unsuccesful
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }

        })

    }


    var createTask = function() {
        $.ajax ({
            type: 'POST',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=493',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify ({
                task: {
                    content: $('#user-tasks').val()
                }
            }),
            success: function(response, textStatus) {
                //erase user input after submiting task
                $('#user-tasks').val('');
                //callback
                getAllTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }
    // creates a task when user submits an input value
    $('#create-task').on('submit', function(e) {
        e.preventDefault();
        createTask();
    })

    var deleteTask = function(id) {
        $.ajax ({
            type: 'DELETE',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=493',
            success: function(response, textStatus) {
                getAllTasks();
                console.log(response);
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }
    //deletes task from DOM and task id
    $(document).on('click', '.delete', function() {
        deleteTask($(this).data('id'));
    })

    var markTaskComplete = function(id) {
        $.ajax ({
            type: 'PUT',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=493',
            dataType: 'json',
            success: function(response, textStatus) {
                getAllTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }

    var markTaskActive = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=493',
            dataType: 'json',
          success: function (response, textStatus) {
            getAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }
      //marks the task id as complete
      $(document).on('change', '.mark-complete', function() {
        if (this.checked) {
            markTaskComplete($(this).data('id'));
        }
        //if unchecked, task is active
        else {
            markTaskActive($(this).data('id'));
        }
    })
    //callback
    //displays tasks submitted at start of application
    getAllTasks();
})