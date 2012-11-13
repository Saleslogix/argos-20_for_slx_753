/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('Mobile/Slx20for753/ApplicationModule', [
    'Sage/Platform/Mobile/ApplicationModule'
], function(ApplicationModule) {

    return dojo.declare('Mobile.Slx20for753.ApplicationModule', ApplicationModule, {
        loadCustomizations: function() {
            dojo.extend(Mobile.SalesLogix.Application, {
                authenticateUser: function(credentials, options) {
                    var service = this.getService()
                        .setUserName(credentials.username)
                        .setPassword(credentials.password || '');

                    var request = new Sage.SData.Client.SDataSingleResourceRequest(service);
                    request.setResourceKind('Users');
                    request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Where, dojo.string.substitute("UserName eq '${0}'", [credentials.username]));

                    request.read({
                        success: dojo.hitch(this, this.onAuthenticateUserSuccess, credentials, options.success, options.scope),
                        failure: dojo.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope),
                        aborted: dojo.hitch(this, this.onAuthenticateUserFailure, options.failure, options.scope),
                        scope: this
                    });
                },
                onAuthenticateUserSuccess: function(credentials, callback, scope, result) {
                    var user = {
                        '$key': dojo.trim(result['$key']),
                        '$descriptor': result['$descriptor'],
                        'UserName': result['UserName']
                    };

                    this.context['user' ] = user;

                    if (credentials.remember)
                    {
                        try
                        {
                            if (window.localStorage)
                                window.localStorage.setItem('credentials', Base64.encode(dojo.toJson({
                                    username: credentials.username,
                                    password: credentials.password || ''
                                })));
                        }
                        catch (e) { }
                    }

                    if (callback)
                        callback.call(scope || this, {user: user});

                }
            });
        }
    });
});
