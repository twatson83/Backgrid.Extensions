    "use strict";

    Backgrid.cell_initialize_original = Backgrid.Cell.prototype.initialize;
    Backgrid.Cell.prototype.initialize = function() {
        Backgrid.cell_initialize_original.apply(this, arguments);
        var className = this.column.get('className');
        if (className) this.$el.addClass(className);
        if (this.column.attributes.handler) {
            this.column.attributes.handler(this.model, this.$el);
        }
    };

    Backgrid.headerCell_initialize_original = Backgrid.HeaderCell.prototype.initialize;
    Backgrid.HeaderCell.prototype.initialize = function() {
        Backgrid.headerCell_initialize_original.apply(this, arguments);
        var className = this.column.get('headerClassName');
        if (className) this.$el.addClass(className);
    };

    Backgrid.HtmlCell = Backgrid.Cell.extend({
        className: "html-cell",
        render: function() {
            this.$el.empty();
            this.$el.html(this.formatter.fromRaw(this.model.get(this.column.get("name")), this.model));
            this.delegateEvents();
            return this;
        }
    });

    Backgrid.DropdownCell = Backgrid.Cell.extend({
        className: 'dropdown-cell',
        render: function() {
            _.bindAll(this, 'updateModel', 'remove');
            this.$el.empty();
            this.$select = $(this.formatter.fromRaw(this.model.get(this.column.get('name')), this.model));
            this.$select.val(this.model.get(this.column.get('name')));
            this.$select.on("change", this.updateModel);
            this.$el.html(this.$select);
            this.delegateEvents();
            return this;
        },

        updateModel: function() {
            this.model.set(this.column.get('name'), this.formatter.toRaw(this.$select));
        },

        remove: function() {
            if (this.$select) {
                this.$select.off("change", this.updateModel);
            }
            if (this.currentEditor) {
                this.currentEditor.remove.apply(this.currentEditor, arguments);
                delete this.currentEditor;
            }
            return Backgrid.Cell.__super__.remove.apply(this, arguments);
        }
    });
