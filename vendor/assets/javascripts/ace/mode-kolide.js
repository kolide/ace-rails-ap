/* eslint-disable */
define("ace/mode/kolide_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/sql_highlight_rules"], function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var SqlHighlightRules = require("./sql_highlight_rules").SqlHighlightRules;

  var KolideHighlightRules = function() {
    var keywords = (
        "select|insert|update|delete|from|where|and|or|group|by|order|limit|offset|having|as|case|" +
        "when|else|end|type|left|right|join|on|outer|desc|asc|union|create|table|primary|key|if|" +
        "foreign|not|references|default|null|inner|cross|natural|database|drop|grant"
        );

    var builtinConstants = (
        "true|false"
        );

    var builtinFunctions = (
        "avg|count|first|last|max|min|sum|ucase|lcase|mid|len|round|rank|now|format|" +
        "coalesce|ifnull|isnull|nvl"
        );

    var dataTypes = (
        "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
        "money|real|number|integer"
        );

    var osqueryTables = (
      "acpi_tables|ad_config|alf|alf_exceptions|alf_explicit_auths|alf_services|app_schemes|apps|apt_sources|" +
      "arp_cache|asl|authorization_mechanisms|authorizations|authorized_keys|block_devices|browser_plugins|" +
      "carbon_black_info|certificates|chrome_extensions|cpu_time|cpuid|crashes|crontab|deb_packages|device_file|" +
      "device_hash|device_partitions|disk_encryption|disk_events|dns_resolvers|etc_hosts|etc_protocols|etc_services|" +
      "extended_attributes|fan_speed_sensors|file|file_events|firefox_addons|groups|hardware_events|hash|" +
      "homebrew_packages|interface_addresses|interface_details|iokit_devicetree|iokit_registry|iptables|kernel_extensions|" +
      "kernel_info|kernel_integrity|kernel_modules|kernel_panics|keychain_acls|keychain_items|known_hosts|last|launchd|" +
      "launchd_overrides|listening_ports|logged_in_users|magic|managed_policies|memory_info|memory_map|mounts|msr|" +
      "nfs_shares|nvram|opera_extensions|os_version|osquery_events|osquery_extensions|osquery_flags|osquery_info|" +
      "osquery_packs|osquery_registry|osquery_schedule|package_bom|package_install_history|package_receipts|pci_devices|" +
      "platform_info|power_sensors|preferences|process_envs|process_events|process_file_events|process_memory_map|" +
      "process_open_files|process_open_sockets|processes|programs|quicklook_cache|registry|routes|rpm_package_files|" +
      "rpm_packages|safari_extensions|sandboxes|shared_memory|shared_resources|shell_history|signature|sip_config|" +
      "smbios_tables|smc_keys|socket_events|startup_items|suid_bin|syslog|system_controls|system_info|temperature_sensors|" +
      "time|uptime|usb_devices|user_events|user_groups|user_ssh_keys|users|wifi_networks|wmi_cli_event_consumers|" +
      "wmi_event_filters|wmi_filter_consumer_binding|wmi_script_event_consumers|xprotect_entries|xprotect_meta|" +
      "xprotect_reports|yara|yara_events"
      );

    var keywordMapper = this.createKeywordMapper({
      "osquery-token": osqueryTables,
      "support.function": builtinFunctions,
      "keyword": keywords,
      "constant.language": builtinConstants,
      "storage.type": dataTypes,
    }, "identifier", true);

    this.$rules = {
      "start" : [{
        token : "comment",
        regex : "--.*$"
      },  {
        token : "comment",
        start : "/\\*",
        end : "\\*/"
      }, {
        token : "string",           // " string
        regex : '".*?"'
      }, {
        token : "string",           // ' string
        regex : "'.*?'"
      }, {
        token : "constant.numeric", // float
        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
      }, {
        token : keywordMapper,
        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
      }, {
        token : "keyword.operator",
        regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
      }, {
        token : "paren.lparen",
        regex : "[\\(]"
      }, {
        token : "paren.rparen",
        regex : "[\\)]"
      }, {
        token : "text",
        regex : "\\s+"
      }]
    };

    this.normalizeRules();
  };

  oop.inherits(KolideHighlightRules, SqlHighlightRules);

  exports.KolideHighlightRules = KolideHighlightRules;
});

define("ace/mode/kolide",["require","exports","module","ace/lib/oop","ace/mode/sql","ace/mode/kolide_highlight_rules","ace/range"], function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextMode = require("./sql").Mode;
  var KolideHighlightRules = require("./kolide_highlight_rules").KolideHighlightRules;
  var Range = require("../range").Range;

  var Mode = function() {
    this.HighlightRules = KolideHighlightRules;
  };
  oop.inherits(Mode, TextMode);

  (function() {

    this.lineCommentStart = "--";

    this.$id = "ace/mode/kolide";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
