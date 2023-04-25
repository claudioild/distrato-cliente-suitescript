/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/search', 'N/record', 'N/ui/serverWidget'], function (currentRecord, search, record, serverWidget) {

    const afterSubmit = function (ctx) {
        
        record.load
        
    }

    return {
        afterSubmit: afterSubmit,
    }

});