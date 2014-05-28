Backgrid.Extensions
====================

### Table column class

```javascript

columns: [
    {
        className: "name-col",
        name: 'name',
        cell: 'string'
    }
]

```

### HTML Cell

```javascript

columns: [
    {
        label: "",
        name: 'Id',
        cell: 'html',
        editable: false,
        formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
            fromRaw: function (rawValue, model) {
                return "<a href='#products/" + rawValue + "' >Details</a>";
            }
        })
    }
]

```

### Dropdown Cell

```javascript

columns: [
    {
        name: 'Type',
        cell: 'dropdown',
        editable: false,
        formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
            fromRaw: function(rawValue, model) {
                return '<select class="form-control">' +
                    '<option>String</option>' +
                    '<option>Int</option>' +
                    '<option>Double</option>' +
                    '<option>Decimal</option>' +
                    '<option>DateTime</option>' +
                    '<option>Bool</option>' +
                    '</select>';
            },
            toRaw: function($select) {
                return $select.val();
            }
        })
    }
]

```