$(document).ready(function() {
    var getAllTasks = function() {
        $.ajax({
            type: 'GET',
            url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=493',
            dataType: 'json',
            success: function(response, textStatus) {
                $('#api-todo').empty();
                $('#api-todo').filter();
                response.tasks.forEach(function(task) {
                    $('#api-todo').append('<div class="row" id="task-row"><div class="col-12 id="mini-row""><p class="tasks d-inline-block">' + task.content + '</p><button class="btn delete d-inline-block" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
                })
            },
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
                $('#user-tasks').val('');
                getAllTasks();
            },
            error: function(request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        })
    }

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

      $(document).on('change', '.mark-complete', function() {
        if (this.checked) {
            markTaskComplete($(this).data('id'));
        }
        else {
            markTaskActive($(this).data('id'));
        }
    })

})