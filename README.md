# KoLite
**KoLite** contains a set of helpers to aid in creating MVVM applications using JavaScript and Knockout. Including:

1. asyncCommand
2. command
3. activity
4. dirtyFlag

**Current Version** is 1.1.0

See this post for more details on KoLite: http://www.johnpapa.net/kolite1-1


## Latest Changes 
1. Command binding handler supports binding to native Knockout bindings as well as the Knockout event binding for DOM events.

2. Event object get passed on to callback on event bindings, to determine pressed key or keypress event.

3. Added ko.command as an alternative to ko.asyncCommand for synchronous tasks.

4. The asyncCommand's canExecute now defaults to !isExecuting if no canExecute delegate is specified. This eliminates the need of a canExecute delegate in you view-model when you only want disable the bound element when the command is executing.

5. Explicitly do not execute commands when canExecute returns falsy. This is needed for DOM elements like the <a> which cannot be disabled. 

6. Renamed file knockout.asyncCommand.js to knockout.command.js as it now contains both async and sync commands.

##NuGet
Also available on NuGet at https://nuget.org/packages/KoLite

## Quick start
### asyncCommand 
demo: http://jsfiddle.net/johnpapa/gDZDS/
<pre>
&lt;button data-bind="command: saveCommand">Save&lt;/button>
</pre>
<pre>
self.saveCommand = ko.asyncCommand({
    execute: function(callback) {
        $.ajax({
            complete: callback,
            data: { name: self.name() },
            type: 'POST',
            url: '/save/',
                    
            success: function(result) {
                alert('Name saved:' + result)
            }
        })
    },
        
    canExecute: function(isExecuting) {
        return !isExecuting && self.name()
    }
})
</pre>

### asyncCommand - Knockout's 'click' binding handler (the default)
<pre>
&lt;buttondata-bind="command: onClickCommand">click handler test&lt;/button>
</pre>

### asyncCommand - Knockout's 'change' binding handler (or any Knockout binding handler)
<pre>
&lt;select data-bind="command: { change: onChangeCommand }">
	&lt;option>change handler test - a&lt;/option>
	&lt;option>change handler test - b&lt;/option>
&lt;/select>
</pre>

### asyncCommand - Knockout's 'event' binding handler ([documentation here](http://knockoutjs.com/documentation/event-binding.html))
<pre>
&lt;div data-bind="command: { mouseover: tooltipCommand }">Information&lt;/div>
</pre>

### asyncCommand and activity
<pre>
&lt;button data-bind="activity: saveCommand.isExecuting, command: saveCommand">Save&lt;/button>
</pre>

### dirtyFlag
<pre>
// Your model
var Person = function () {
	var self = this;

	self.id = ko.observable();
	self.firstName = ko.observable().extend({ required: true });
	self.lastName = ko.observable().extend({ required: true });
	self.dirtyFlag = new ko.DirtyFlag([self.firstName, self.lastName]);

	return self;
};
</pre>

Hook these into your viewmodel ...

<pre>
// Property on your view model. myPerson is an instance of Person.
// Did it Change?
isDirty = ko.computed(function () {
	return myPerson().dirtyFlag().isDirty()
})
</pre>

<pre>
// Resync Changes
dirtyFlag().reset()
</pre>



## Depends on
&gt;= jQuery 1.4.4

&gt;= KnockoutJS 2.0.0



## Authors

**Hans Fjällemark**

+ http://twitter.com/hfjallemark

**John Papa**

+ http://twitter.com/John_Papa

## Credits
Inspired by http://KnockoutJS.com


## Copyright

Copyright © 2012 [Hans Fjällemark](http://twitter.com/hfjallemark) & [John Papa](http://twitter.com/John_Papa).

## License 

KoLite is under MIT license - http://www.opensource.org/licenses/mit-license.php