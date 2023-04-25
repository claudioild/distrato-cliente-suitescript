/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/ui/serverWidget', 'N/currentRecord', 'N/search'], function (UI, currentRecord, search) {

    const beforeLoad = function (ctx) {
        const form = ctx.form;
        const registro = ctx.newRecord;
        const idContrato = registro.getValue("id");
        const linkDistrato = registro.getValue("custbody_lrc_distratolarcom")

        form.clientScriptModulePath = "./_lrc_clientScriptDistCont.js"

        if (ctx.type == ctx.UserEventType.VIEW && linkDistrato == "" ) {
            form.addButton({
                id: "custpage_lrc_distrato",
                label: "Distrato Contrato",
                functionName: "abrirLancamento(" + idContrato + ")"
            })
        }
    }

    return {
        beforeLoad: beforeLoad,
    }

});