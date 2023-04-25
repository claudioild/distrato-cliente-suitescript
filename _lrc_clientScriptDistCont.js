/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/url','N/currentRecord', 'N/search', 'N/record'], function( url, currentRecord, search, record) {
    
    
    function pageInit(scriptContext) {

    }

    function abrirLancamento(recordId){
        
       
        var registroContrato = record.load({
            type: record.Type.SALES_ORDER,
            id: recordId          
        });
        
        var item= []
        var obj = {
            moeda : registroContrato.getValue("currency"),
            cliente : registroContrato.getValue("entity"),
            subsidiaria : registroContrato.getValue("subsidiary"),
            trandate : registroContrato.getValue("trandate"),
            item: []
        }
        const value = registroContrato.getValue("custbody_lrc_distratolarcom");

        console.log(value);

        console.log("objetos", obj)

        var lancamento = record.create({
            type: "journalentry",
            isDynamic: true
        });
        
        lancamento.setValue({
            fieldId : "subsidiary",
            value:obj.subsidiaria
        });
        lancamento.setValue({
            fieldId : "approvalstatus",
            value: 1
        })
        var lineNum = lancamento.selectLine({
            sublistId: 'line',
            line: 0
        });
        lancamento.setCurrentSublistValue({
            sublistId: 'line',
            fieldId: 'account',
            value: 28956
        });
        lancamento.setCurrentSublistValue({
            sublistId: 'line',
            fieldId: 'debit',
            value: 1
        });
        lancamento.setCurrentSublistValue({
            sublistId: 'line',
            fieldId: 'entity',
            value: obj.cliente
        });
        lancamento.commitLine({
            sublistId: 'line'
        });
        var lineNum = lancamento.selectLine({
            sublistId: 'line',
            line: 1
        });
        lancamento.setCurrentSublistValue({
            sublistId: 'line',
            fieldId: 'account',
            value: 28744
        });
        lancamento.setCurrentSublistValue({
            sublistId: 'line',
            fieldId: 'credit',
            value: 1
        });
        lancamento.setCurrentSublistValue({
            sublistId: 'line',
            fieldId: 'entity',
            value: obj.cliente
        });
        lancamento.commitLine({
            sublistId: 'line'
        });

        var lancamentoId = lancamento.save({
            enableSourcing: true,
            ignoreMandatoryFields: true 
        });

        const urlLancamento = url.resolveRecord({
            recordType: "journalentry",
            recordId: lancamentoId,
            isEditMode: true
        });

        window.location.replace(urlLancamento);

        const urlLink = url.resolveRecord({
            recordType: "journalentry",
            recordId: lancamentoId,
            isEditMode: false
        });

        registroContrato.setValue({
            fieldId: 'custbody_lrc_distratolarcom',
            value: '<a href="'+urlLink+'">Lançamento Distrato</a>',
            ignoreFieldChange: true
        });
        
        registroContrato.save({
            enableSourcing: true,
            ignoreMandatoryFields: true
        });
        
        console.log("registro salvo", lancamentoId);
    }

    
    return {
        pageInit: pageInit,
        abrirLancamento: abrirLancamento
    };

});